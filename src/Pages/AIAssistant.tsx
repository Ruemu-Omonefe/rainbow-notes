// AIAssistant.jsx
// Matches Home.jsx & Features.jsx style — Tailwind + inline styles

import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── Sample prompts for the demo ───
const DEMO_FLOWS = [
  {
    label: "Continue writing",
    color: "#5a50c8",
    bg: "#f0eeff",
    userMsg: "I started writing about the feeling of rain but I'm stuck...\n\n\"The rain always made her feel something she couldn't name. Like a memory of a place she'd never been...\"",
    aiMsg: "\"The rain always made her feel something she couldn't name. Like a memory of a place she'd never been — a coastal town, maybe, with salt-worn shutters and a harbour that smelled of old rope and possibility. She'd stand at the window and let the sound fill her the way music sometimes did, not heard but felt, somewhere behind the ribs.\"",
    tag: "Continued your story",
  },
  {
    label: "Fix grammar",
    color: "#1a8a60",
    bg: "#e8fdf6",
    userMsg: "their going to the store but they doesnt have no money and the weather is very very bad outside.",
    aiMsg: "\"They're going to the store, but they don't have any money — and the weather outside is terrible.\"",
    tag: "Grammar corrected",
  },
  {
    label: "Expand idea",
    color: "#c06810",
    bg: "#fff5ea",
    userMsg: "Idea: an app that helps people build better morning routines using AI.",
    aiMsg: "\"An AI-powered morning routine coach that learns your energy patterns, sleep quality, and goals over time. Each morning it generates a personalised sequence — breathing exercise, hydration reminder, a 3-minute journal prompt, and a focused task list — adapting daily based on how yesterday went. The app integrates with wearables and evolves with you, turning the first hour of your day into your most intentional one.\"",
    tag: "Idea expanded",
  },
  {
    label: "Change tone",
    color: "#c02018",
    bg: "#fff0ef",
    userMsg: "Make this more professional:\n\"Hey!! Just checking in lol, did you get my last email? I really need that report ASAP thx!!\"",
    aiMsg: "\"Hi, I wanted to follow up on my previous email. Could you let me know if you had a chance to review it? I'd appreciate receiving the report at your earliest convenience. Thank you.\"",
    tag: "Tone adjusted → Professional",
  },
];

// ─── Typing animation hook ───
function useTyping(text, active) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    setDisplayed(""); setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, 18);
    return () => clearInterval(interval);
  }, [text, active]);

  return [displayed, done];
}

// ─── Interactive Demo ───
function AiDemo() {
  const [active, setActive] = useState(0);
  const flow = DEMO_FLOWS[active];
  const [aiText, done] = useTyping(flow.aiMsg, true);

  // reset typing when tab changes
  const [key, setKey] = useState(0);
  const handleTab = (i) => { setActive(i); setKey(k => k + 1); };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tab strip */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {DEMO_FLOWS.map((f, i) => (
          <button
            key={f.label}
            onClick={() => handleTab(i)}
            className="text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200"
            style={{
              background: active === i ? f.color : f.bg,
              color: active === i ? "white" : f.color,
              boxShadow: active === i ? `0 4px 14px ${f.color}40` : "none",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: "#e8e6f5", boxShadow: "0 8px 40px rgba(90,80,200,0.1)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ background: "#f8f7ff", borderColor: "#e8e6f5" }}>
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          <span className="ml-3 text-xs font-semibold tracking-wider uppercase" style={{ color: "#a09ab8" }}>
            AI Assistant
          </span>
          <span
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1"
            style={{ background: "#e8fdf6", color: "#1a8a60" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ animation: "pulse 1.5s infinite" }} />
            Active
          </span>
        </div>

        {/* Messages */}
        <div className="p-6 flex flex-col gap-5" style={{ background: "white", minHeight: "320px" }}>
          {/* User bubble */}
          <div className="flex justify-end">
            <div
              className="rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-[80%]"
              style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)", color: "white" }}
            >
              <p className="text-xs font-bold mb-1.5 opacity-60 tracking-wide uppercase">You</p>
              <p className="text-sm leading-relaxed whitespace-pre-line">{flow.userMsg}</p>
            </div>
          </div>

          {/* AI bubble */}
          <div className="flex justify-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
              style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="8" cy="8" r="2" fill="white" opacity="0.5"/>
                <line x1="8" y1="3" x2="8" y2="1" stroke="white" strokeWidth="1.2"/>
                <line x1="8" y1="13" x2="8" y2="15" stroke="white" strokeWidth="1.2"/>
                <line x1="3" y1="8" x2="1" y2="8" stroke="white" strokeWidth="1.2"/>
                <line x1="13" y1="8" x2="15" y2="8" stroke="white" strokeWidth="1.2"/>
              </svg>
            </div>
            <div
              className="rounded-2xl rounded-tl-sm px-5 py-3.5 max-w-[80%]"
              style={{ background: "#f8f7ff", border: "1px solid #e8e6f5" }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-xs font-bold tracking-wide uppercase" style={{ color: "#5a50c8" }}>Rainbow AI</p>
                <span
                  className="text-xs font-semibold rounded-full px-2 py-0.5"
                  style={{ background: flow.bg, color: flow.color }}
                >
                  {flow.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#1a1830" }}>
                {aiText}
                {!done && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                    style={{ background: "#5a50c8", animation: "blink 1s step-end infinite" }}
                  />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-5 py-4 border-t flex items-center gap-3" style={{ background: "#f8f7ff", borderColor: "#e8e6f5" }}>
          <div
            className="flex-1 rounded-xl px-4 py-2.5 text-sm"
            style={{ background: "white", border: "1.5px solid #e8e6f5", color: "#a09ab8" }}
          >
            Ask the AI anything about your notes…
          </div>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)", boxShadow: "0 4px 14px rgba(90,80,200,0.4)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M9 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }
      `}</style>
    </div>
  );
}

// ─── Capability card ───
function CapCard({ icon, title, desc, bg, color }) {
  return (
    <div
      className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: bg, borderColor: "#e8e6f5" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "#1a1830" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#6b6880" }}>{desc}</p>
    </div>
  );
}

// ─── How it works step ───
function Step({ num, title, desc, color }) {
  return (
    <div className="flex gap-5 items-start">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
        style={{ background: `linear-gradient(135deg,${color},${color}99)`, boxShadow: `0 4px 14px ${color}40` }}
      >
        {num}
      </div>
      <div>
        <h4 className="font-semibold text-base mb-1" style={{ color: "#1a1830" }}>{title}</h4>
        <p className="text-sm leading-relaxed" style={{ color: "#6b6880" }}>{desc}</p>
      </div>
    </div>
  );
}

// ─── Main Page ───
export default function AIAssistant() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="flex flex-col items-center justify-center min-h-[65vh] bg-gradient-to-br from-gray-400 to-indigo-800 text-white py-20 px-8 text-center relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(120,110,255,0.25) 0%,transparent 60%)" }}
        />

        <div className="relative z-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full mb-6 px-4 py-1.5"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#38c9b0", animation: "pulse 1.5s infinite" }} />
            Powered by AI
          </span>

          <h1 className="text-5xl font-bold tracking-wide mb-4 animate-fadeIn">
            Your AI Writing Assistant
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto animate-fadeIn delay-150">
            A smart companion built into every notebook. It reads context, understands intent, and helps you write better — without ever leaving your page.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/register">
              <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold">
                Try It Free
              </button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-2 border-2 border-white hover:bg-white hover:text-gray-900 transition rounded-full text-lg font-semibold">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Live Demo ── */}
      <div className="px-8 md:px-20 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#5a50c8" }}>Live Demo</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">See the AI in action</h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#6b6880" }}>
            Pick a task below and watch Rainbow AI respond in real time.
          </p>
        </div>
        <AiDemo />
      </div>

      {/* ── Capabilities grid ── */}
      <div className="px-8 md:px-20 py-16" style={{ background: "#f8f7ff" }}>
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#5a50c8" }}>Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">Everything the AI can do</h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "#6b6880" }}>
            One assistant. Endless ways to help you write.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {[
            {
              title: "Continue Writing",
              desc: "Stuck mid-sentence? The AI picks up exactly where you left off, matching your voice and style.",
              bg: "#f0eeff", color: "#5a50c8",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M14 6l6 6-6 6" stroke="#5a50c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              title: "Fix Grammar & Style",
              desc: "Instant corrections for grammar, spelling, punctuation, and awkward phrasing — in one click.",
              bg: "#e8fdf6", color: "#1a8a60",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h10M4 17h7" stroke="#1a8a60" strokeWidth="2" strokeLinecap="round"/><circle cx="19" cy="17" r="3" stroke="#1a8a60" strokeWidth="1.8"/><path d="M17.5 17l1 1 2-2" stroke="#1a8a60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              title: "Expand Your Ideas",
              desc: "Turn a bullet point or rough idea into a fully fleshed-out paragraph, section, or outline.",
              bg: "#fff5ea", color: "#c06810",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="#c06810" strokeWidth="2" strokeLinecap="round"/></svg>,
            },
            {
              title: "Change Tone",
              desc: "Rewrite any passage as formal, casual, persuasive, empathetic, or whatever tone fits the moment.",
              bg: "#fff0ef", color: "#c02018",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6h4l2 12 3-8 2 4h5" stroke="#c02018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              title: "Summarise Notes",
              desc: "Paste a long passage and get a crisp, accurate summary — great for research and revision.",
              bg: "#eff6ff", color: "#2563eb",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#2563eb" strokeWidth="1.8" fill="none"/><line x1="8" y1="9" x2="16" y2="9" stroke="#2563eb" strokeWidth="1.5"/><line x1="8" y1="13" x2="14" y2="13" stroke="#2563eb" strokeWidth="1.5"/><line x1="8" y1="17" x2="11" y2="17" stroke="#2563eb" strokeWidth="1.5"/></svg>,
            },
            {
              title: "Brainstorm with AI",
              desc: "Ask for 10 ideas, story angles, essay arguments, or title options — instantly, on demand.",
              bg: "#f5f3ff", color: "#7c3aed",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" stroke="#7c3aed" strokeWidth="1.8" fill="none"/><path d="M9 13v2a3 3 0 006 0v-2" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round"/></svg>,
            },
          ].map(c => (
            <CapCard key={c.title} {...c} />
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-16 px-8 md:px-20 py-20">
        <div className="md:w-1/2">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#5a50c8" }}>How it works</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ color: "#1a1830" }}>
            AI that works<br />inside your notebook
          </h2>
          <div className="flex flex-col gap-8">
            <Step num="1" color="#5a50c8" title="Write naturally"
              desc="Just write in your notebook as you normally would. No special commands, no switching apps." />
            <Step num="2" color="#1a8a60" title="Highlight or ask"
              desc="Select any text and choose an action, or type a prompt in the AI panel to the side." />
            <Step num="3" color="#c06810" title="Review & accept"
              desc="See the AI's suggestion alongside your original. Accept all, accept in part, or regenerate." />
            <Step num="4" color="#2563eb" title="Keep writing"
              desc="The AI learns your preferences over time, getting better and more personalised with every session." />
          </div>
        </div>

        {/* Visual panel */}
        <div className="md:w-1/2 w-full">
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "#e8e6f5", boxShadow: "0 8px 40px rgba(90,80,200,0.1)" }}
          >
            {/* Chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ background: "#f8f7ff", borderColor: "#e8e6f5" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-3 text-xs font-medium" style={{ color: "#a09ab8" }}>My Journal.note</span>
            </div>

            {/* Notebook body */}
            <div className="flex" style={{ minHeight: "360px" }}>
              {/* Paper */}
              <div
                className="flex-1 p-6 relative"
                style={{
                  background: "white",
                  backgroundImage: "repeating-linear-gradient(to bottom,transparent 0,transparent 27px,#eeecff 27px,#eeecff 28px)",
                }}
              >
                {/* Red margin */}
                <div className="absolute top-0 bottom-0 left-14 w-px" style={{ background: "rgba(255,79,56,0.25)" }} />
                <div className="pl-8">
                  <p className="text-sm leading-[28px] mb-0" style={{ color: "#1a1830" }}>
                    The morning light came in sideways through the blinds,
                  </p>
                  {/* Highlighted text */}
                  <p className="text-sm leading-[28px]">
                    <span
                      className="rounded px-0.5"
                      style={{ background: "rgba(90,80,200,0.15)", color: "#1a1830", borderBottom: "2px solid #5a50c8" }}
                    >
                      casting long amber stripes across the floor that reminded her of something she couldn't quite place.
                    </span>
                  </p>
                  <p className="text-sm leading-[28px]" style={{ color: "#1a1830" }}>She sat at the edge of the bed and waited.</p>
                </div>

                {/* Floating action pill */}
                <div
                  className="absolute flex gap-1.5 px-3 py-2 rounded-xl shadow-lg"
                  style={{
                    background: "white",
                    border: "1px solid #e8e6f5",
                    boxShadow: "0 4px 20px rgba(90,80,200,0.18)",
                    top: "120px", left: "24px",
                  }}
                >
                  {["Continue", "Expand", "Rephrase"].map((a, i) => (
                    <button
                      key={a}
                      className="text-xs font-semibold rounded-lg px-3 py-1.5 transition-all duration-200"
                      style={{
                        background: i === 0 ? "#5a50c8" : "#f0eeff",
                        color: i === 0 ? "white" : "#5a50c8",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI sidebar */}
              <div
                className="w-52 flex-shrink-0 p-4 border-l flex flex-col gap-3"
                style={{ background: "#f8f7ff", borderColor: "#e8e6f5" }}
              >
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#5a50c8" }}>AI Suggestion</p>
                <div
                  className="rounded-xl p-3 text-xs leading-relaxed border"
                  style={{ background: "white", borderColor: "#e8e6f5", color: "#1a1830" }}
                >
                  "…casting long amber stripes across the floor — tiger-light, she used to call it as a child, though she'd long since forgotten why."
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="flex-1 text-xs font-semibold py-2 rounded-lg text-white"
                    style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)" }}
                  >
                    Accept
                  </button>
                  <button
                    className="flex-1 text-xs font-semibold py-2 rounded-lg border"
                    style={{ borderColor: "#e8e6f5", color: "#6b6880" }}
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="bg-gradient-to-br from-gray-400 to-indigo-800 px-8 md:px-20 py-16 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          {[
            { num: "10×", label: "Faster writing", sub: "With AI auto-complete" },
            { num: "6",   label: "AI actions",     sub: "Built into every notebook" },
            { num: "∞",   label: "Ideas generated", sub: "Limited only by imagination" },
          ].map(s => (
            <div key={s.num}
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
            >
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                {s.num}
              </div>
              <div className="font-semibold text-lg mb-1">{s.label}</div>
              <div className="text-sm text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-8 md:px-20 py-20 text-center" style={{ background: "#f8f7ff" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#5a50c8" }}>Get started today</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "#1a1830" }}>
          Write smarter,<br />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
            not harder.
          </span>
        </h2>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "#6b6880" }}>
          The AI assistant is built into every notebook. Start free and experience writing like never before.
        </p>
        <Link to="/register">
          <button className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200">
            Open my notebook →
          </button>
        </Link>
      </div>
    </>
  );
}