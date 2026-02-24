import styles from "../styles/notebookItem.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Switch } from "@mui/material";
import Page from "./Page";
import { getNoteById } from "../shared/services/commonService";
import img from "../assets/book-cover1.png";
import NoteLoader from "../Common/Loader/Loader";

declare global {
  interface Window {
    $: any;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface PageContent {
  type: string;
  content: string;
}

interface AIAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
}

interface ToolbarPosition {
  x: number;
  y: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const AI_ACTIONS: AIAction[] = [
  { id: "continue",  label: "Continue",    icon: "→", color: "#5a50c8", bg: "#f0eeff" },
  { id: "grammar",   label: "Fix Grammar", icon: "✓", color: "#1a8a60", bg: "#e8fdf6" },
  { id: "expand",    label: "Expand",      icon: "+", color: "#c06810", bg: "#fff5ea" },
  { id: "tone",      label: "Change Tone", icon: "~", color: "#c02018", bg: "#fff0ef" },
  { id: "summarise", label: "Summarise",   icon: "≡", color: "#2563eb", bg: "#eff6ff" },
];

const TONE_OPTIONS = ["Professional", "Casual", "Persuasive", "Empathetic", "Poetic"];

// ─── Mock AI call — replace with your real API ───────────────────────────────
async function callAI(action: string, text: string, tone = ""): Promise<string> {
  // TODO: replace with real API call:
  // const res = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, text, tone }) });
  // const data = await res.json();
  // return data.result;

  await new Promise((r) => setTimeout(r, 1200));
  const map: Record<string, string> = {
    continue:  text + " The words came slowly at first, then all at once — filling the page the way light fills a room when the curtains are finally drawn back.",
    grammar:   text.replace(/\s+/g, " ").trim(),
    expand:    text + "\n\nTo elaborate: this idea carries weight beyond its surface. Each thread pulls at something deeper, worth exploring across multiple perspectives.",
    tone:      `[${tone || "Professional"} tone] ` + text.split(" ").slice(0, 8).join(" ") + " — rewritten with clarity and purpose.",
    summarise: "Summary: " + text.split(" ").slice(0, 14).join(" ") + "...",
  };
  return map[action] ?? text;
}

// ─── Floating Toolbar ─────────────────────────────────────────────────────────
interface FloatingToolbarProps {
  position: ToolbarPosition | null;
  onAction: (id: string) => void;
  onClose: () => void;
}

function FloatingToolbar({ position, onAction, onClose }: FloatingToolbarProps) {
  if (!position) return null;

  return (
    <div
      className="fixed z-50 flex items-center gap-1 rounded-xl px-2 py-1.5"
      style={{
        top: position.y - 54,
        left: position.x,
        transform: "translateX(-50%)",
        background: "white",
        border: "1px solid #e8e6f5",
        boxShadow: "0 8px 32px rgba(90,80,200,0.18)",
      }}
    >
      {/* Pointer */}
      <div
        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
        style={{ background: "white", borderRight: "1px solid #e8e6f5", borderBottom: "1px solid #e8e6f5" }}
      />
      <span className="text-xs font-bold tracking-widest uppercase px-1 mr-1" style={{ color: "#a09ab8" }}>AI</span>
      {AI_ACTIONS.map((a) => (
        <button
          key={a.id}
          onClick={() => onAction(a.id)}
          className="text-xs font-semibold rounded-lg px-2.5 py-1.5 transition-all duration-150 hover:-translate-y-0.5"
          style={{ background: a.bg, color: a.color }}
          title={a.label}
        >
          {a.label}
        </button>
      ))}
      <button
        onClick={onClose}
        className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors text-xs"
      >
        ✕
      </button>
    </div>
  );
}

// ─── AI Side Panel ────────────────────────────────────────────────────────────
interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  pendingAction: string | null;
  onApply: (text: string) => void;
  onClearPending: () => void;
}

function AIPanel({ isOpen, onClose, selectedText, pendingAction, onApply, onClearPending }: AIPanelProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (!result) { setTyped(""); return; }
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      setTyped(result.slice(0, ++i));
      if (i >= result.length) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [result]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  // Fire pending action from floating toolbar
  useEffect(() => {
    if (pendingAction && selectedText && isOpen) {
      runAction(pendingAction);
      onClearPending();
    }
  }, [pendingAction, isOpen]);

  const runAction = async (actionId: string, text = selectedText) => {
    if (!text?.trim()) return;
    setActiveAction(actionId);
    setLoading(true);
    setResult("");
    const res = await callAI(actionId, text, tone);
    setResult(res);
    setLoading(false);
  };

  const sendChat = async () => {
    if (!prompt.trim()) return;
    const userMsg = prompt;
    setPrompt("");
    setChatHistory((h) => [...h, { role: "user", text: userMsg }]);
    setLoading(true);
    const res = await callAI("continue", userMsg);
    setChatHistory((h) => [...h, { role: "ai", text: res }]);
    setLoading(false);
  };

  return (
    <div
      className="flex flex-col h-full transition-all duration-300 overflow-hidden flex-shrink-0"
      style={{
        width: isOpen ? "300px" : "0px",
        opacity: isOpen ? 1 : 0,
        borderLeft: isOpen ? "1px solid #e8e6f5" : "none",
        background: "#f8f7ff",
      }}
    >
      {isOpen && (
        <>
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: "#e8e6f5", background: "white" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)" }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="4" stroke="white" strokeWidth="1.4" fill="none"/>
                  <circle cx="6.5" cy="6.5" r="1.6" fill="white" opacity="0.45"/>
                  <line x1="6.5" y1="2" x2="6.5" y2="0.5" stroke="white" strokeWidth="1.2"/>
                  <line x1="6.5" y1="12" x2="6.5" y2="13" stroke="white" strokeWidth="1.2"/>
                  <line x1="2" y1="6.5" x2="0.5" y2="6.5" stroke="white" strokeWidth="1.2"/>
                  <line x1="11" y1="6.5" x2="12.5" y2="6.5" stroke="white" strokeWidth="1.2"/>
                </svg>
              </div>
              <span className="text-sm font-bold" style={{ color: "#1a1830" }}>Rainbow AI</span>
              <span
                className="flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5"
                style={{ background: "#e8fdf6", color: "#1a8a60" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  style={{ animation: "pulse 1.5s infinite" }}
                />
                Active
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">

            {/* Selected text preview */}
            {selectedText ? (
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a09ab8" }}>
                  Selected text
                </p>
                <div
                  className="rounded-xl p-3 text-xs leading-relaxed border"
                  style={{
                    background: "white",
                    borderColor: "#e8e6f5",
                    color: "#6b6880",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}
                >
                  {selectedText}
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl p-3 text-xs text-center border border-dashed"
                style={{ borderColor: "#c4b5fd", color: "#a09ab8" }}
              >
                Select text on a page to use AI actions
              </div>
            )}

            {/* Quick actions */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a09ab8" }}>
                Quick actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                {AI_ACTIONS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => runAction(a.id)}
                    disabled={loading || !selectedText}
                    className="flex items-center gap-2 text-xs font-semibold rounded-xl px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed text-left"
                    style={{ background: a.bg, color: a.color }}
                  >
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center font-bold flex-shrink-0"
                      style={{ background: `${a.color}22`, fontSize: "0.7rem" }}
                    >
                      {a.icon}
                    </span>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone picker */}
            {activeAction === "tone" && (
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a09ab8" }}>
                  Select tone
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TONE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTone(t); runAction("tone"); }}
                      className="text-xs font-semibold rounded-full px-3 py-1 transition-all duration-150"
                      style={{
                        background: tone === t ? "#5a50c8" : "#f0eeff",
                        color: tone === t ? "white" : "#5a50c8",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI result */}
            {(loading || result) && (
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a09ab8" }}>
                  {loading ? "Thinking…" : "AI suggestion"}
                </p>
                <div
                  className="rounded-xl p-3 border"
                  style={{ background: "white", borderColor: "#c4b5fd" }}
                >
                  {loading ? (
                    <div className="flex items-center gap-2 py-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "#5a50c8",
                            animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#1a1830" }}>
                        {typed}
                        {typed.length < result.length && (
                          <span
                            className="inline-block w-0.5 h-3 ml-0.5 align-middle"
                            style={{ background: "#5a50c8", animation: "blink 1s step-end infinite" }}
                          />
                        )}
                      </p>
                      {typed.length === result.length && result && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => { onApply(result); setResult(""); setActiveAction(null); }}
                            className="flex-1 text-xs font-bold py-2 rounded-lg text-white"
                            style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)" }}
                          >
                            ✓ Apply
                          </button>
                          <button
                            onClick={() => runAction(activeAction!)}
                            className="flex-1 text-xs font-semibold py-2 rounded-lg border hover:bg-gray-50"
                            style={{ borderColor: "#e8e6f5", color: "#6b6880" }}
                          >
                            ↺ Retry
                          </button>
                          <button
                            onClick={() => { setResult(""); setActiveAction(null); }}
                            className="flex-1 text-xs font-semibold py-2 rounded-lg border hover:bg-gray-50"
                            style={{ borderColor: "#e8e6f5", color: "#6b6880" }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Chat */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#a09ab8" }}>
                Chat with AI
              </p>
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e8e6f5" }}>
                {chatHistory.length > 0 && (
                  <div
                    className="p-3 flex flex-col gap-3 overflow-y-auto"
                    style={{ background: "white", maxHeight: "180px" }}
                  >
                    {chatHistory.map((m, i) => (
                      <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className="text-xs leading-relaxed rounded-xl px-3 py-2 max-w-[85%]"
                          style={{
                            background: m.role === "user"
                              ? "linear-gradient(135deg,#5a50c8,#3b3598)"
                              : "#f0eeff",
                            color: m.role === "user" ? "white" : "#1a1830",
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex gap-1.5 px-1 py-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "#5a50c8",
                              animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}
                <div
                  className="flex items-center gap-2 p-2 border-t"
                  style={{ borderColor: "#e8e6f5", background: "#f8f7ff" }}
                >
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                    placeholder="Ask AI anything…"
                    className="flex-1 text-xs px-3 py-2 rounded-lg outline-none"
                    style={{ background: "white", border: "1px solid #e8e6f5", color: "#1a1830" }}
                  />
                  <button
                    onClick={sendChat}
                    disabled={loading || !prompt.trim()}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes blink  { 50% { opacity: 0; } }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}

// ─── Word count ───────────────────────────────────────────────────────────────
function WordCount({ text }: { text: string }) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <span className="text-xs" style={{ color: "#a09ab8" }}>
      {words}w · {text.length}c
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const NotebookItem = () => {
  const notebookRef = useRef<HTMLDivElement>(null);

  // Original state
  const [showPageFullMessage, setShowPageFullMessage] = useState(false);
  const [checked, setChecked]     = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noOfPages, setNoOfPages] = useState<number | null>(null);
  const [coverImage, setCoverImage] = useState<string>("");
  const [noteContent, setNoteContent] = useState<PageContent[]>([]);
  const [starred, setStarred]     = useState(false);
  const isMobile = window.innerWidth < 900;

  // AI state
  const [aiPanelOpen, setAiPanelOpen]   = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [toolbarPos, setToolbarPos]     = useState<ToolbarPosition | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [currentPageText, setCurrentPageText] = useState("");

  // ── Responsive isMobile ──
  const [isMobileState, setIsMobileState] = useState(window.innerWidth < 900);
  useEffect(() => {
    const onResize = () => setIsMobileState(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Text selection → floating toolbar ──
  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? "";
      if (text.length > 2) {
        setSelectedText(text);
        const range = sel!.getRangeAt(0);
        const rect  = range.getBoundingClientRect();
        setToolbarPos({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY });
      } else {
        setToolbarPos(null);
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // ── Apply AI result to active textarea ──
  const applyAIResult = (text: string) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const node = sel.getRangeAt(0).commonAncestorContainer;
      const el   = node.nodeType === 1 ? (node as Element) : node.parentElement;
      const ta   = el?.closest("textarea") as HTMLTextAreaElement | null;
      if (ta) {
        const start = ta.selectionStart ?? 0;
        const end   = ta.selectionEnd   ?? 0;
        ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    setToolbarPos(null);
  };

  const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setShowControl(!showControl);
  };

  // ── Fetch note ──
  useEffect(() => {
    const noteId = window.location.pathname.split("/").pop() ?? "";
    if (!noteId) return;
    getNoteById(noteId)
      .then((response) => {
        setNoteTitle(response.data.title);
        setNoOfPages(response.data.numberOfPages || 2);
        setCoverImage(img);
        setNoteContent(response.data.content || []);
      })
      .catch((err) => console.error("Error fetching note:", err));
  }, []);

  // ── Init Turn.js ──
  useEffect(() => {
    if (!noOfPages) return;

    if (notebookRef.current && window.$ && window.$.fn.turn) {
      const $el = window.$(notebookRef.current);
      if (!$el.data("initialized")) {
        const containerHeight = notebookRef.current.offsetHeight || 600;
        $el.turn({
          width: 1200,
          height: containerHeight,
          autoCenter: true,
          display: isMobile ? "single" : "double",
          elevation: 50,
          gradients: true,
          duration: 1000,
          acceleration: true,
        });
        $el.data("initialized", true);
      }
    }

    if (!isMobile) {
      const handleEdgeClick = (e: MouseEvent) => {
        if (!notebookRef.current) return;
        const $el  = window.$(notebookRef.current);
        const rect = notebookRef.current.getBoundingClientRect();
        const threshold = 80;
        const page  = $el.turn("page");
        const pages = $el.turn("pages");
        if (e.clientX - rect.left < threshold && page > 1)   $el.turn("previous");
        else if (rect.right - e.clientX < threshold && page < pages) $el.turn("next");
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!notebookRef.current) return;
        const rect = notebookRef.current.getBoundingClientRect();
        const threshold = 80;
        notebookRef.current.style.cursor =
          e.clientX - rect.left < threshold || rect.right - e.clientX < threshold
            ? "pointer" : "default";
      };

      const el = notebookRef.current;
      el?.addEventListener("click", handleEdgeClick);
      el?.addEventListener("mousemove", handleMouseMove);

      return () => {
        el?.removeEventListener("click", handleEdgeClick);
        el?.removeEventListener("mousemove", handleMouseMove);
        if (notebookRef.current && window.$) {
          try { window.$(notebookRef.current).turn("destroy").removeData("initialized"); }
          catch (e) { console.warn("Turn.js cleanup skipped:", e); }
        }
      };
    }
  }, [isMobile, noOfPages]);

  // ── Prevent overflow typing ──
  useEffect(() => {
    const container = notebookRef.current;
    if (!container) return;

    const handleInput = (e: Event) => {
      const ta = e.target as HTMLTextAreaElement;
      if (ta.scrollHeight > ta.clientHeight) {
        ta.value = ta.value.slice(0, -1);
        setShowPageFullMessage(true);
        setTimeout(() => setShowPageFullMessage(false), 2000);
      }
      setCurrentPageText(ta.value);
    };

    const textareas = container.querySelectorAll("textarea");
    textareas.forEach((ta) => ta.addEventListener("input", handleInput));
    return () => textareas.forEach((ta) => ta.removeEventListener("input", handleInput));
  }, [noOfPages]);

  // ── Freeze pages ──
  const pages = useMemo(() => {
    if (!noOfPages) return null;
    return Array.from({ length: noOfPages }).map((_, i) => (
      <Page key={i} index={i} pageContent={noteContent[i]} />
    ));
  }, [noOfPages]);

  if (!noOfPages) return <NoteLoader />;

  return (
    <>
      {/* ── Top Bar ── */}
      <div
        className="grid grid-cols-3 items-center px-5 py-2 w-full sticky top-0 z-40"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e8e6f5",
          boxShadow: "0 1px 12px rgba(90,80,200,0.06)",
        }}
      >
        {/* Left: controls + word count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium hidden sm:block" style={{ color: "#6b6880" }}>
              Controls
            </span>
            <Switch
              checked={checked}
              onChange={handleControlChange}
              size="small"
              sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#5a50c8" }, "& .Mui-checked + .MuiSwitch-track": { backgroundColor: "#c4b5fd" } }}
            />
          </div>

          {showControl && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => window.$(notebookRef.current).turn("previous")}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: "#f0eeff", color: "#5a50c8" }}
              >
                <ChevronLeftIcon fontSize="small" />
              </button>
              <button
                onClick={() => window.$(notebookRef.current).turn("next")}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: "#f0eeff", color: "#5a50c8" }}
              >
                <ChevronRightIcon fontSize="small" />
              </button>
            </div>
          )}

          <WordCount text={currentPageText} />
        </div>

        {/* Centre: title */}
        <div className="text-center font-semibold text-xl sm:text-2xl" style={{ color: "#1a1830" }}>
          {noteTitle}
        </div>

        {/* Right: AI toggle + star */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setAiPanelOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: aiPanelOpen ? "linear-gradient(135deg,#5a50c8,#3b3598)" : "#f0eeff",
              color: aiPanelOpen ? "white" : "#5a50c8",
              boxShadow: aiPanelOpen ? "0 4px 14px rgba(90,80,200,0.35)" : "none",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              <circle cx="6.5" cy="6.5" r="1.6" fill="currentColor" opacity="0.4"/>
              <line x1="6.5" y1="2" x2="6.5" y2="0.5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="6.5" y1="12" x2="6.5" y2="13" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="2" y1="6.5" x2="0.5" y2="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="11" y1="6.5" x2="12.5" y2="6.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span className="hidden sm:inline">{aiPanelOpen ? "Close AI" : "AI Assistant"}</span>
          </button>

          <button onClick={() => setStarred((s) => !s)}>
            {starred
              ? <StarIcon sx={{ color: "#f59e0b" }} />
              : <StarBorderIcon sx={{ color: "#f59e0b" }} />
            }
          </button>
        </div>
      </div>

      {/* ── Main area: notebook + AI panel ── */}
      <div className="flex items-stretch" style={{ minHeight: "calc(100vh - 56px)" }}>

        {/* Notebook column */}
        <div
          className="flex-1 flex flex-col items-center justify-start transition-all duration-300"
          style={{ background: "#f0eeee", paddingTop: "24px", paddingBottom: "24px" }}
        >
          {/* Page full alert */}
          {showPageFullMessage && (
            <div
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 text-sm font-semibold rounded-full px-5 py-2.5"
              style={{
                background: "#fff0ef",
                color: "#c02018",
                border: "1px solid #fca5a5",
                boxShadow: "0 4px 20px rgba(192,32,24,0.15)",
              }}
            >
              ⚠ Page is full — move to the next page to continue.
            </div>
          )}

          <div ref={notebookRef} className={styles.notebook}>
            {/* Front Cover */}
            <div className={styles.page}>
              <div className={styles.cover} style={{ backgroundImage: `url(${coverImage})` }}>
                My Notebook
              </div>
            </div>

            {/* Pages */}
            {pages}

            {/* Back Cover */}
            <div className={styles.page}>
              <div className={styles.cover} style={{ backgroundImage: `url(${coverImage})` }} />
            </div>
          </div>

          {/* Hint */}
          <p className="mt-4 text-xs" style={{ color: "#a09ab8" }}>
            Click edges to flip · Select text for AI actions
          </p>
        </div>

        {/* AI Panel */}
        <AIPanel
          isOpen={aiPanelOpen}
          onClose={() => setAiPanelOpen(false)}
          selectedText={selectedText}
          pendingAction={pendingAction}
          onApply={applyAIResult}
          onClearPending={() => setPendingAction(null)}
        />
      </div>

      {/* Floating toolbar */}
      <FloatingToolbar
        position={toolbarPos}
        onAction={(id) => {
          setToolbarPos(null);
          setPendingAction(id);
          setAiPanelOpen(true);
        }}
        onClose={() => setToolbarPos(null)}
      />
    </>
  );
};

export default NotebookItem;