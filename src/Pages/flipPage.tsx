import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";

/**
 * FlipNotebook — Turn.js–style page curl & book flipping in pure React + CSS 3D
 *
 * Features
 * - Front & back cover
 * - Set number of pages (inner writable pages)
 * - Realistic corner drag (bottom-left / bottom-right) with page curl illusion
 * - Click-to-flip when tapping the corner
 * - Textareas on inner pages (covers are not writable)
 * - Keyboard support: ← → to flip
 * - Responsive: scales down with maxWidth
 *
 * Notes
 * - No external libraries (no jQuery). Pure CSS transforms + a bit of math.
 * - The curl effect uses: rotateY for the page, gradient shadows, and a fold mask.
 * - For best realism, place the book on a non-white background.
 */

// ---------- Types ----------

type FlipNotebookProps = {
  /** Total INNER pages (excluding covers). Must be >= 2 for a decent book. */
  pages: number;
  /** Full width of the closed book in pixels (including both page stacks). */
  width?: number;
  /** Full height in pixels. */
  height?: number;
  /** Optional max width to allow responsive scaling. */
  maxWidth?: number | string;
  /** Initial text content for inner pages (index 1..pages). */
  initialContent?: string[];
  /** Book title shown on the front cover */
  title?: string;
};

// Helper: clamp
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// ---------- Component ----------

export default function FlipNotebook({
  pages,
  width = 900,
  height = 600,
  maxWidth = "100%",
  initialContent = [],
  title = "My Notebook",
}: FlipNotebookProps) {
  const totalLeafs = useMemo(() => {
    // Covers (2) + inner pages (pages). We treat each sheet as a "leaf" which has a front+back.
    // We'll create an array of individual pages where index 0 = front cover, last = back cover.
    // Inner writable pages are 1..(pages).
    // To get proper leaf count, we need an even number of total pages for spreads.
    const total = pages + 2; // include both covers
    // If total is odd, add a blank page at the end for pairing
    return total % 2 === 0 ? total : total + 1;
  }, [pages]);

  // Page content state (only for inner pages). Index matches page index.
  const [content, setContent] = useState<string[]>(() => {
    const arr = Array(totalLeafs).fill("") as string[];
    for (let i = 0; i < initialContent.length && i + 1 < totalLeafs - 1; i++) {
      arr[i + 1] = initialContent[i];
    }
    return arr;
  });
  useEffect(() => {
    // If pages prop changes, resize content array
    setContent(prev => {
      const arr = Array(totalLeafs).fill("") as string[];
      for (let i = 0; i < Math.min(prev.length, arr.length); i++) arr[i] = prev[i];
      return arr;
    });
  }, [totalLeafs]);

  // Current left-most visible page index (even), like book spread: [left=spreadIndex, right=spreadIndex+1]
  const [spreadIndex, setSpreadIndex] = useState(0); // 0 means front cover is on the right, nothing on left

  // Drag state for the active flipping page
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragFromLeft, setDragFromLeft] = useState<boolean | null>(null);
  const [dragProgress, setDragProgress] = useState(0); // 0..1

  const pageWidth = width / 2;

  // Derived: what page is currently being dragged/flipped
  const activePageIndex = useMemo(() => {
    if (!dragging) return null;
    if (dragFromLeft === null) return null;
    // When dragging from right corner (to turn to the left), the active page is the right page of the spread
    // i.e., spreadIndex + 1
    // When dragging from left corner (to turn to the right), the active page is the left page of the previous spread
    return dragFromLeft ? spreadIndex : spreadIndex + 1;
  }, [dragging, dragFromLeft, spreadIndex]);

  const canFlipLeft = spreadIndex > 0; // there are pages to the left to reveal
  const canFlipRight = spreadIndex + 2 < totalLeafs; // there are pages to the right to reveal

  // Map drag progress [0..1] to rotation angle degrees [0..180]
  const progressToDeg = (p: number) => p * 180;

  const startDrag = useCallback(
    (e: React.PointerEvent, fromLeft: boolean) => {
      if ((fromLeft && !canFlipRight) || (!fromLeft && !canFlipLeft)) return;
      setDragging(true);
      setDragFromLeft(fromLeft);
      setDragProgress(0.001);
      (e.target as Element).setPointerCapture?.(e.pointerId);
    },
    [canFlipLeft, canFlipRight]
  );

  const onDrag = useCallback((e: React.PointerEvent) => {
    if (!dragging || dragFromLeft === null) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left; // 0..width

    // We only care about horizontal drag across the page width
    const p = dragFromLeft ? x / (width / 2) : (width - x) / (width / 2);
    setDragProgress(clamp(p, 0, 1));
  }, [dragging, dragFromLeft, width]);

  const endDrag = useCallback(() => {
    if (!dragging || dragFromLeft === null) return;
    const committed = dragProgress > 0.5; // threshold: more than halfway
    if (committed) {
      if (dragFromLeft) {
        // turning right → left-to-right flip (advance spread)
        setSpreadIndex(si => si + 2);
      } else {
        // turning left → right-to-left flip (go back spread)
        setSpreadIndex(si => si - 2);
      }
    }
    setDragging(false);
    setDragFromLeft(null);
    setDragProgress(0);
  }, [dragging, dragFromLeft, dragProgress]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && canFlipRight) setSpreadIndex(i => i + 2);
      if (e.key === "ArrowLeft" && canFlipLeft) setSpreadIndex(i => i - 2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canFlipLeft, canFlipRight]);

  // Helper: human-friendly page label
  const pageLabel = (i: number) => {
    if (i === 0) return "Front Cover";
    if (i === totalLeafs - 1) return "Back Cover";
    return `Page ${i}`;
  };

  // Render pages stack
  const pagesElements = [] as React.ReactNode[];
  for (let i = 0; i < totalLeafs; i++) {
    const isLeftSide = i % 2 === 0; // even index lives on left when opened

    // Determine visibility and transforms
    // Base: pages to the left of spreadIndex live in the left stack; to the right live on the right stack.
    const isInLeftStack = i < spreadIndex;
    const isInRightStack = i > spreadIndex + 1;
    const isInSpread = i === spreadIndex || i === spreadIndex + 1;

    // Z-index so the active page sits on top during drag
    const zBase = 10 + i; // deeper pages higher z so edges look layered
    let z = zBase;

    // Active flipping page rotation and dynamic shadows
    let rotationDeg = 0;
    let translateX = 0;
    let shadowOpacity = 0;
    let foldOpacity = 0;

    const isActive = activePageIndex === i;

    if (isActive) {
      const deg = progressToDeg(dragProgress);
      rotationDeg = dragFromLeft ? -deg : deg; // left-corner drag rotates page towards right
      translateX = dragFromLeft ? pageWidth * dragProgress : -pageWidth * dragProgress;
      shadowOpacity = 0.35 * Math.sin((dragProgress * Math.PI));
      foldOpacity = 0.6 * Math.sin((dragProgress * Math.PI));
      z = 1000; // ensure above others
    } else {
      // Static stacks: left stack pages are fully turned; right stack pages not yet turned
      if (isInLeftStack) {
        rotationDeg = -180;
        translateX = pageWidth;
      } else if (isInRightStack) {
        rotationDeg = 0;
        translateX = 0;
      } else if (isInSpread) {
        rotationDeg = isLeftSide ? -180 : 0; // the left spread page is part of the turned stack visually
        translateX = isLeftSide ? pageWidth : 0;
      }
    }

    // Interactivity: define which corners are hot zones
    const allowWrite = i !== 0 && i !== totalLeafs - 1; // not covers
    const showRightCorner = i === spreadIndex + 1 && canFlipLeft && !dragging; // bottom-right of right page
    const showLeftCorner = i === spreadIndex && canFlipRight && !dragging; // bottom-left of left page

    pagesElements.push(
      <div
        key={i}
        className="page"
        style={{
          zIndex: z,
          transform: `translateX(${isLeftSide ? 0 : pageWidth}px) rotateY(${rotationDeg}deg) translateX(${translateX}px)`,
        }}
      >
        <div className={`sheet ${i === 0 ? "cover cover-front" : i === totalLeafs - 1 ? "cover cover-back" : "paper"}`}>
          {/* Content */}
          <div className="page-content">
            <div className="page-header">{pageLabel(i)}</div>
            {allowWrite ? (
              <textarea
                className="page-textarea"
                placeholder="Write here..."
                value={content[i]}
                onChange={(e) => setContent((prev) => {
                  const next = prev.slice();
                  next[i] = e.target.value;
                  return next;
                })}
              />
            ) : (
              <div className="cover-content">{i === 0 ? title : ""}</div>
            )}
          </div>

          {/* Dynamic shadow on the face */}
          <div className="face-shadow" style={{ opacity: shadowOpacity }} />
          {/* Fold high-light along the curl edge */}
          <div className="fold-highlight" style={{ opacity: foldOpacity }} />

          {/* Corners */}
          {showRightCorner && (
            <button className="corner corner-right" onPointerDown={(e) => startDrag(e, false)} />
          )}
          {showLeftCorner && (
            <button className="corner corner-left" onPointerDown={(e) => startDrag(e, true)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="book-wrap">
      <div
        ref={containerRef}
        className="book"
        style={{ width, height, maxWidth }}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {/* Background table */}
        <div className="shadow-ambient" />

        {/* Left & Right stacks are implicit via transforms; we render all pages and rely on z-index */}
        <div className="pages-stack">{pagesElements}</div>

        {/* Controls */}
        <div className="ui">
          <button className="btn" disabled={!canFlipLeft || dragging} onClick={() => setSpreadIndex(i => i - 2)}>
            ◀ Prev
          </button>
          <div className="spread-indicator">
            {Math.floor(spreadIndex / 2) + 1} / {Math.floor((totalLeafs - 2) / 2) + 1}
          </div>
          <button className="btn" disabled={!canFlipRight || dragging} onClick={() => setSpreadIndex(i => i + 2)}>
            Next ▶
          </button>
        </div>
      </div>

      <style>{`
        .book-wrap { display: grid; place-items: center; padding: 2rem; }
        .book {
          position: relative;
          aspect-ratio: ${width} / ${height};
          width: 100%;
          max-width: ${typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth};
          background: radial-gradient(1200px 500px at 50% 100%, #e9e6df 0%, #d8d4cc 35%, #c9c5bd 60%, #bdb8af 100%);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          overflow: visible; /* allow 3D shadows */
          perspective: 2000px;
        }
        .shadow-ambient { position: absolute; inset: 4% 3%; box-shadow: inset 0 40px 80px rgba(0,0,0,0.22); border-radius: 16px; }
        .pages-stack { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: ${width}px; height: ${height}px; transform-style: preserve-3d; }

        .page {
          position: absolute;
          top: 0; left: 0;
          width: ${width}px; height: ${height}px;
          transform-style: preserve-3d;
          transition: transform 380ms cubic-bezier(.2,.8,.2,1);
        }
        /* While dragging, remove transition for active feel */
        :global(.page[style*="rotateY("]) { will-change: transform; }

        .sheet {
          position: absolute; top: 0; left: 0;
          width: ${pageWidth}px; height: ${height}px;
          backface-visibility: hidden;
          transform-origin: left center;
          border-radius: 8px 0 0 8px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 1px 0 rgba(0,0,0,0.08);
        }
        /* Right-hand pages shift over by half width */
        .page:nth-child(odd) .sheet { left: ${pageWidth}px; transform-origin: right center; border-radius: 0 8px 8px 0; }

        .cover { background: linear-gradient(135deg, #2d3a5a, #1c2540); color: #f5f6fa; box-shadow: inset 0 0 0 2px rgba(255,255,255,0.06); }
        .cover-front { background: linear-gradient(135deg, #1b3358, #091e3a); }
        .cover-back { background: linear-gradient(135deg, #3b2f2f, #1b0b0b); }
        .paper { background: repeating-linear-gradient(#fff, #fff 24px, #f2f7ff 25px); }

        .page-content { position: absolute; inset: 16px; display: grid; grid-template-rows: auto 1fr; gap: 8px; }
        .page-header { font-weight: 600; font-size: 14px; opacity: 0.5; }
        .cover-content { font-size: 28px; font-weight: 700; letter-spacing: 0.5px; }
        .page-textarea {
          width: 100%; height: 100%; resize: none; border: none; outline: none;
          background: transparent; font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
          padding: 4px; color: #222;
        }

        .face-shadow { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(0,0,0,0.20), rgba(0,0,0,0.05) 40%, rgba(255,255,255,0.0) 60%); mix-blend-mode: multiply; transition: opacity 120ms ease; }
        .fold-highlight { position: absolute; top: 0; bottom: 0; width: 28px; right: -2px; background: linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.8), rgba(255,255,255,0.0)); pointer-events: none; transition: opacity 120ms ease; opacity: 0; }

        .corner { position: absolute; width: 46px; height: 46px; border-radius: 50%; bottom: 10px; border: none; background: rgba(0,0,0,0.04); cursor: grab; }
        .corner:hover { background: rgba(0,0,0,0.10); }
        .corner-left { left: 10px; }
        .corner-right { right: 10px; }

        .ui { position: absolute; bottom: -56px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; align-items: center; }
        .btn { padding: 8px 14px; border-radius: 999px; border: 0; background: #111; color: #fff; cursor: pointer; font-weight: 600; }
        .btn[disabled] { opacity: .3; cursor: not-allowed; }
        .spread-indicator { font-size: 12px; opacity: .7; background: rgba(0,0,0,0.06); padding: 6px 10px; border-radius: 999px; }

        /* Subtle book gutter */
        .pages-stack::before { content: ""; position: absolute; left: ${pageWidth - 2}px; top: 0; width: 4px; height: 100%; background: linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.03), rgba(0,0,0,.12)); filter: blur(0.2px); }
      `}</style>
    </div>
  );
}
