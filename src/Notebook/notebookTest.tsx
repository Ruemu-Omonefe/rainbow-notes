import React, { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook, { FlipEvent } from "react-pageflip";
import { motion } from "framer-motion";

// --- Utilities --------------------------------------------------------------
function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState] as const;
}

// Lined paper style
const linedPaperStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
  backgroundSize: "100% 28px",
};

// Simple id helper
const uid = () => Math.random().toString(36).slice(2);

// --- Page Components --------------------------------------------------------

type NotePageProps = {
  pageIndex: number;
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
};

const NotePage = React.forwardRef<HTMLDivElement, NotePageProps>(
  ({ pageIndex, value, onChange, readOnly }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-full p-6 md:p-8 bg-white select-text"
        style={linedPaperStyle}
        onMouseDown={(e) => {
          // prevent accidental page flips while writing
          e.stopPropagation();
        }}
      >
        <div className="text-xs text-gray-400 mb-2">Page {pageIndex + 1}</div>
        <textarea
          className="w-full h-[85%] resize-none outline-none bg-transparent leading-7 md:leading-8 text-[15px] md:text-[16px]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={!!readOnly}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          placeholder={readOnly ? "" : "Start writing..."}
        />
      </div>
    );
  }
);
NotePage.displayName = "NotePage";

const Cover = React.forwardRef<HTMLDivElement, { side: "front" | "back" }>(
  ({ side }, ref) => (
    <div
      ref={ref}
      className="w-full h-full relative overflow-hidden"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className={`absolute inset-0 ${
        side === "front"
          ? "bg-emerald-600"
          : "bg-stone-700"
      }`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.2),transparent_40%)]" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 h-full w-full p-6 md:p-8 flex flex-col"
      >
        <div className="flex-1" />
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm shadow-lg">
          <h1 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
            {side === "front" ? "My Notebook" : "The End"}
          </h1>
          {side === "front" && (
            <p className="text-white/90 mt-1 text-sm">Flip the edge to begin</p>
          )}
        </div>
      </motion.div>
      {/* spiral binding */}
      <div className="absolute top-0 bottom-0 left-0 w-5 md:w-6 bg-gradient-to-r from-black/20 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-5 md:w-6 bg-gradient-to-l from-black/20 to-transparent" />
    </div>
  )
);
Cover.displayName = "Cover";

// --- Main Component ---------------------------------------------------------
export default function NotebookFlipbook() {
  // number of writable pages (excluding covers); must be even for spreads
  const [pageCount, setPageCount] = useLocalStorage<number>(
    "notebook:pageCount",
    12
  );

  // content store
  const [pages, setPages] = useLocalStorage<Array<{ id: string; text: string }>>(
    "notebook:pages",
    Array.from({ length: Math.max(2, pageCount) }, () => ({ id: uid(), text: "" }))
  );

  // resync pages length when pageCount changes
  useEffect(() => {
    setPages((prev) => {
      const target = Math.max(2, pageCount);
      if (prev.length === target) return prev;
      if (prev.length < target) {
        return [
          ...prev,
          ...Array.from({ length: target - prev.length }, () => ({ id: uid(), text: "" })),
        ];
      } else {
        return prev.slice(0, target);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount]);

  const bookRef = useRef<HTMLFlipBook | null>(null);
  const [page, setPage] = useState(0);

  const width = 680; // desktop single page width
  const height = 900; // desktop height

  const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches;

  const pageSize = useMemo(() => ({
    width: mobile ? 360 : width,
    height: mobile ? 560 : height,
  }), [mobile]);

  const handleFlip = (e: FlipEvent) => {
    setPage(e.data);
  };

  const flipPrev = () => bookRef.current?.pageFlip().flipPrev();
  const flipNext = () => bookRef.current?.pageFlip().flipNext();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-white flex flex-col items-center py-8 md:py-12">
      <div className="w-full max-w-5xl px-4 flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="font-medium">Pages:</span>
          <input
            type="number"
            className="w-20 md:w-24 rounded-xl border border-gray-300 px-3 py-1 outline-none focus:ring-2 focus:ring-emerald-400"
            min={2}
            step={2}
            value={pageCount}
            onChange={(e) => setPageCount(Math.max(2, Math.floor(Number(e.target.value) / 2) * 2))}
          />
          <span className="text-gray-500">(even number)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={flipPrev}
            className="rounded-2xl px-4 py-2 border shadow-sm hover:shadow transition active:scale-[0.98]"
          >
            Prev
          </button>
          <div className="text-sm text-gray-500">Page {page + 1}</div>
          <button
            onClick={flipNext}
            className="rounded-2xl px-4 py-2 border shadow-sm hover:shadow transition active:scale-[0.98]"
          >
            Next
          </button>
        </div>
      </div>

      <div className="relative">
        {/* edge click zones to mimic real notebook flipping from corners */}
        <button
          onClick={flipPrev}
          className="absolute z-20 left-0 top-0 h-full w-8 md:w-10 opacity-0"
          aria-label="Flip previous"
        />
        <button
          onClick={flipNext}
          className="absolute z-20 right-0 top-0 h-full w-8 md:w-10 opacity-0"
          aria-label="Flip next"
        />

        <HTMLFlipBook
          ref={bookRef as any}
          width={pageSize.width}
          height={pageSize.height}
          size="fixed"
          minWidth={320}
          maxWidth={900}
          minHeight={480}
          maxHeight={1200}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          onFlip={handleFlip}
          className="shadow-2xl rounded-2xl overflow-hidden"
          style={{
            borderRadius: 16,
          }}
        >
          {/* Front cover */}
          <div className="bg-transparent">
            <Cover side="front" />
          </div>

          {/* Writable pages */}
          {pages.map((p, i) => (
            <div key={p.id} className="bg-white">
              <NotePage
                pageIndex={i}
                value={p.text}
                onChange={(val) =>
                  setPages((prev) => prev.map((x, idx) => (idx === i ? { ...x, text: val } : x)))
                }
              />
            </div>
          ))}

          {/* Back cover */}
          <div className="bg-transparent">
            <Cover side="back" />
          </div>
        </HTMLFlipBook>

        {/* book shadow + ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => {
            setPages((prev) => prev.map((p) => ({ ...p, text: "" })));
          }}
          className="rounded-2xl px-4 py-2 border shadow-sm hover:shadow transition"
        >
          Clear Notes
        </button>
        <button
          onClick={() => {
            const blob = new Blob([
              pages
                .map((p, idx) => `Page ${idx + 1}\n\n${p.text}\n\n---\n`)
                .join("\n"),
            ], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "notebook.txt";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="rounded-2xl px-4 py-2 border shadow-sm hover:shadow transition"
        >
          Export .txt
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 px-4 text-center max-w-2xl">
        Tip: Writing is stored locally in your browser (localStorage). Flip pages by dragging from the edges, clicking the invisible edge zones, or using the Prev/Next buttons. Use an even page count for realistic two-page spreads.
      </p>
    </div>
  );
}
