// Features.jsx
// Matches the style of Home.jsx — Tailwind + inline styles where needed

import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="3" width="20" height="26" rx="2" stroke="#5a50c8" strokeWidth="1.8" fill="none"/>
        <rect x="2" y="5" width="2" height="22" rx="1" fill="#a78bfa"/>
        <line x1="8" y1="11" x2="20" y2="11" stroke="#5a50c8" strokeWidth="1.2" opacity="0.4"/>
        <line x1="8" y1="15" x2="20" y2="15" stroke="#5a50c8" strokeWidth="1.2" opacity="0.4"/>
        <line x1="8" y1="19" x2="15" y2="19" stroke="#5a50c8" strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
    badge: { label: "Core Feature", bg: "#f0eeff", color: "#5a50c8" },
    title: "Real Notebook Feel",
    desc: "Pages that flip with a satisfying turn. Ruled lines, dot grids, blank canvas — choose your paper. The tactile experience, fully digitized.",
    bullets: ["Flip animation on every page turn", "Ruled, dotted & blank page layouts", "Customizable cover designs"],
    gradient: "from-indigo-50 to-purple-50",
    accent: "#5a50c8",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#1a8a60" strokeWidth="1.8" fill="none"/>
        <circle cx="16" cy="16" r="5" fill="#1a8a60" opacity="0.15"/>
        <line x1="16" y1="4" x2="16" y2="9" stroke="#1a8a60" strokeWidth="1.8"/>
        <line x1="16" y1="23" x2="16" y2="28" stroke="#1a8a60" strokeWidth="1.8"/>
        <line x1="4" y1="16" x2="9" y2="16" stroke="#1a8a60" strokeWidth="1.8"/>
        <line x1="23" y1="16" x2="28" y2="16" stroke="#1a8a60" strokeWidth="1.8"/>
      </svg>
    ),
    badge: { label: "AI-Powered", bg: "#e8fdf6", color: "#1a8a60" },
    title: "AI Writing Assistant",
    desc: "Context-aware suggestions, tone adjustments, and idea expansion — an assistant that reads between the lines and writes beside you.",
    bullets: ["Smart inline suggestions", "Grammar & style fixes", "Idea expansion & brainstorming"],
    gradient: "from-emerald-50 to-teal-50",
    accent: "#1a8a60",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 28 L16 6 L26 28" stroke="#c06810" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <line x1="9" y1="21" x2="23" y2="21" stroke="#c06810" strokeWidth="1.8"/>
        <circle cx="16" cy="6" r="2.5" fill="#c06810" opacity="0.25"/>
      </svg>
    ),
    badge: { label: "Customization", bg: "#fff5ea", color: "#c06810" },
    title: "Beautiful Covers",
    desc: "Hundreds of handcrafted notebook covers. Generate custom ones with AI, or upload your own artwork. Your shelf, your story.",
    bullets: ["100+ curated cover designs", "AI-generated custom covers", "Upload your own artwork"],
    gradient: "from-amber-50 to-orange-50",
    accent: "#c06810",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="26" height="18" rx="3" stroke="#c02018" strokeWidth="1.8" fill="none"/>
        <path d="M10 8V6a6 6 0 0112 0v2" stroke="#c02018" strokeWidth="1.8" fill="none"/>
        <circle cx="16" cy="17" r="3" fill="#c02018" opacity="0.2" stroke="#c02018" strokeWidth="1.5"/>
        <line x1="16" y1="20" x2="16" y2="22" stroke="#c02018" strokeWidth="1.5"/>
      </svg>
    ),
    badge: { label: "Privacy", bg: "#fff0ef", color: "#c02018" },
    title: "Secure & Private",
    desc: "Your notes are yours. End-to-end encryption, private notebooks, and granular sharing controls keep your thoughts safe.",
    bullets: ["End-to-end encryption", "Private & shared notebooks", "Granular access controls"],
    gradient: "from-red-50 to-rose-50",
    accent: "#c02018",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="#2563eb" strokeWidth="1.8" fill="none"/>
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="#2563eb" strokeWidth="1.8" fill="none"/>
        <rect x="4" y="18" width="10" height="10" rx="2" stroke="#2563eb" strokeWidth="1.8" fill="none"/>
        <rect x="18" y="18" width="10" height="10" rx="2" stroke="#2563eb" strokeWidth="1.8" fill="none"/>
        <line x1="9" y1="14" x2="9" y2="18" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2"/>
        <line x1="23" y1="14" x2="23" y2="18" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2"/>
        <line x1="14" y1="9" x2="18" y2="9" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2"/>
        <line x1="14" y1="23" x2="18" y2="23" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2"/>
      </svg>
    ),
    badge: { label: "Organization", bg: "#eff6ff", color: "#2563eb" },
    title: "Smart Organization",
    desc: "Tag, search, and organize notebooks effortlessly. Find any note in seconds with AI-powered semantic search.",
    bullets: ["AI-powered semantic search", "Tags, folders & collections", "Quick-access pinned notes"],
    gradient: "from-blue-50 to-indigo-50",
    accent: "#2563eb",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="16" r="5" stroke="#7c3aed" strokeWidth="1.8" fill="none"/>
        <circle cx="22" cy="10" r="5" stroke="#7c3aed" strokeWidth="1.8" fill="none"/>
        <circle cx="22" cy="22" r="5" stroke="#7c3aed" strokeWidth="1.8" fill="none"/>
        <line x1="15" y1="14" x2="17" y2="11.5" stroke="#7c3aed" strokeWidth="1.5"/>
        <line x1="15" y1="18" x2="17" y2="20.5" stroke="#7c3aed" strokeWidth="1.5"/>
      </svg>
    ),
    badge: { label: "Collaboration", bg: "#f5f3ff", color: "#7c3aed" },
    title: "Share & Collaborate",
    desc: "Share notebooks with friends, classmates, or teammates. Real-time co-editing with comments and version history.",
    bullets: ["Real-time co-editing", "Comments & reactions", "Full version history"],
    gradient: "from-violet-50 to-purple-50",
    accent: "#7c3aed",
  },
];

const faqs = [
  { q: "Is Rainbow Notes free to use?", a: "Yes! Rainbow Notes has a generous free tier. Premium plans unlock unlimited notebooks, AI features, and advanced covers." },
  { q: "Does it work offline?", a: "Absolutely. Your notebooks sync when you're online and remain fully accessible offline — no internet required to write." },
  { q: "How does the AI assistant work?", a: "Our AI reads the context of your current note and offers inline suggestions, grammar fixes, and idea expansions without leaving the page." },
  { q: "Can I import my existing notes?", a: "Yes — import from Notion, Evernote, Apple Notes, or plain text/markdown files with one click." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ borderColor: open ? "#c4b5fd" : "#e8e6f5", background: open ? "#faf9ff" : "white" }}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold text-base" style={{ color: "#1a1830" }}>{q}</span>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300"
          style={{ background: open ? "#5a50c8" : "#f0eeff", transform: open ? "rotate(45deg)" : "none" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="1" x2="6" y2="11" stroke={open ? "white" : "#5a50c8"} strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="1" y1="6" x2="11" y2="6" stroke={open ? "white" : "#5a50c8"} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: "#6b6880" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-400 to-indigo-800 text-white py-20 px-8 text-center">
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full mb-6 px-4 py-1.5"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
          Everything you need
        </span>

        <h1 className="text-5xl font-bold tracking-wide mb-4 animate-fadeIn">
          Packed with powerful features
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto animate-fadeIn delay-150">
          From AI-powered writing to beautiful covers and real notebook feel — Rainbow Notes has everything to make writing your favourite habit.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/register">
            <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold">
              Get Started Free
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-2 border-2 border-white hover:bg-white hover:text-gray-900 transition rounded-full text-lg font-semibold">
              Log In
            </button>
          </Link>
        </div>
      </div>

      {/* ── Feature Cards Grid ── */}
      <div className="px-8 md:px-20 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#5a50c8" }}>Features</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">What makes Rainbow Notes special</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#6b6880" }}>
            Every feature is crafted to make writing feel natural, intelligent, and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className={`bg-gradient-to-br ${f.gradient} rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group`}
              style={{ borderColor: "#e8e6f5" }}
            >
              {/* Icon + Badge row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                >
                  {f.icon}
                </div>
                <span
                  className="text-xs font-semibold rounded-full px-3 py-1"
                  style={{ background: f.badge.bg, color: f.badge.color }}
                >
                  {f.badge.label}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2" style={{ color: "#1a1830" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#6b6880" }}>{f.desc}</p>

              {/* Bullets */}
              <ul className="flex flex-col gap-2">
                {f.bullets.map(b => (
                  <li key={b} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: "#1a1830" }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: f.badge.bg }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4l2 2 4-4" stroke={f.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison / Highlight strip ── */}
      <div className="bg-gradient-to-br from-gray-400 to-indigo-800 px-8 md:px-20 py-20 text-white">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3 text-indigo-300">Why choose us</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">Writing, reinvented</h2>
          <p className="text-gray-300 max-w-lg mx-auto text-base">
            Rainbow Notes combines the intimacy of a real notebook with the power of modern AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { num: "100+", label: "Notebook Covers", sub: "Curated & AI-generated" },
            { num: "10×", label: "Faster Writing", sub: "With AI suggestions" },
            { num: "100%", label: "Private & Secure", sub: "End-to-end encrypted" },
          ].map(s => (
            <div key={s.num}
              className="rounded-2xl p-8 text-center"
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

      {/* ── FAQ ── */}
      <div className="px-8 md:px-20 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#5a50c8" }}>FAQ</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">Common questions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-8 md:px-20 py-20 text-center" style={{ background: "#f8f7ff" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#5a50c8" }}>Get started today</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: "#1a1830" }}>
          Open your notebook.<br />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
            Start writing today.
          </span>
        </h2>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "#6b6880" }}>
          Free to start. No credit card required. Just you and the page.
        </p>
        <Link to="/register">
          <button className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200">
            Create my notebook →
          </button>
        </Link>
      </div>
    </>
  );
}