// import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import img from "../assets/img1.png"
// import book from "../assets/book.png"
// import book2 from "../assets/book2.png"
// import book3 from "../assets/book3.png"
import AnimatedNote from "./AnimatedNote";
import FlipBook from "./flipBook";

const TILES = [
  { bg: "linear-gradient(160deg,#f9a8a0,#e85d72)", hasPlay: true },
  { bg: "linear-gradient(160deg,#a8edea,#3ab8a0)" },
  { bg: "linear-gradient(160deg,#fde68a,#f59e0b,#ef4444)" },
  { bg: "linear-gradient(160deg,#d1fae5,#6ee7b7)" },
  { bg: "linear-gradient(160deg,#ede9fe,#a78bfa)" },
  { bg: "linear-gradient(160deg,#f5f5f4,#d6d3d1)" },
  { bg: "linear-gradient(160deg,#fef9c3,#fde047,#86efac)" },
  { bg: "linear-gradient(160deg,#fed7aa,#fb923c)" },
];

function ImageGrid() {
  return (
    <div className="grid grid-cols-4 gap-5 flex-shrink-0" style={{ gridTemplateRows: "repeat(2, 150px)" }}>
      {TILES.map((t, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden relative cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:shadow-lg"
          style={{ background: t.bg, height: "150px" }}
        >
          {/* subtle sheen */}
          <div className="absolute inset-0 rounded-xl" style={{ background: "rgba(255,255,255,0.12)", borderRadius: "50%", transform: "scale(0.6) translate(30%,30%)" }} />
          {t.hasPlay && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: "rgba(0,0,0,0.2)" }}>
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="#5a50c8" style={{ marginLeft: "3px" }}>
                  <path d="M0 0l11 6.5L0 13V0z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


function Home() {

    return (
      <>
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-400 to-indigo-800 text-white py-12">
          {/* Hero Section */}
          <div className="text-center px-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase rounded-full mb-6 px-4 py-1.5"
              style={{background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", }}>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
              AI-Powered Notebook
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 animate-fadeIn leading-tight">
              Welcome to
              <span className="bg-gradient-to-r from-white via-indigo-200 to-white text-transparent bg-clip-text"> {" "}
                Rainbow Notes
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mx-auto animate-fadeIn delay-150 leading-relaxed mb-8">Capture your thoughts, flip through pages like a real notebook, and enhance your writing with AI-powered suggestions.</p>

            {/* Call to Action */}
            <div className="mt-6 flex gap-4 justify-center">
              <Link to="/register">
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold cursor-pointer">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-2 border-2 border-white hover:bg-white hover:text-gray-900 transition rounded-full text-lg font-semibold cursor-pointer">
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <AnimatedNote />
          <h2 className="text-3xl md:text-5xl font-bold flex gap-5 justify-center mt-10 lg:mt-4 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            <span>Flip.</span>
            <span>Write.</span>
            <span>Imagine.</span>
          </h2>
        </div>

        {/* Imagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 px-8 py-20 md:px-20 md:py-28 lg:px-32 lg:py-32">
          {/* Image */}
          <div className="md:w-3/5 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl"style={{ boxShadow: "0 30px 80px rgba(90,80,200,0.15)" }}>
              <img src={img} alt="Rainbow Notes covers" className="w-full h-auto block"/>
              {/* Subtle overlay badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                style={{background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",}}>
                <span className="w-2 h-2 rounded-full bg-teal-400" />100+ notebook covers
              </div>
            </div>
          </div>

          {/* text */}
          <div className="md:w-2/5">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{ background: "#f0eeff", color: "#5a50c8" }}>✦ Limitless creativity</span>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 leading-tight" style={{ color: "#1a1830" }}>The only limit is your imagination</p>
            <p className="text-base leading-relaxed mb-8"style={{ color: "#6b6880", maxWidth: "360px" }}>From spontaneous sketches to detailed research notes — Rainbow Notes gives you the canvas and intelligence to bring every idea to life.</p>
            <Link to="/features">
              <button className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: "#f0eeff", color: "#5a50c8" }}
                onMouseEnter={(e) =>(e.currentTarget.style.background = "#e4e0ff")} onMouseLeave={(e) =>(e.currentTarget.style.background = "#f0eeff")}>
                Explore features
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#5a50c8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Flip note section */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 px-8 py-20 md:px-20 md:py-28 lg:px-32 lg:py-32" style={{ background: "linear-gradient(135deg, #f8f7ff 0%, #eaf8f6 100%)" }} >
          {/* Text */}
          <div className="lg:w-2/5">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{ background: "#e8fdf6", color: "#1a8a60" }}>✦ Real notebook feel</span>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 leading-tight" style={{ color: "#1a1830" }}>Flip your notes like a real notebook</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#6b6880", maxWidth: "360px" }}>Every page turn feels authentic. Smooth, realistic animations make digital writing feel genuinely tactile — like holding a real notebook in your hands.</p>

            {/* Mini feature list */}
            <div className="flex flex-col gap-3">
              {[ "Swipe or click to turn pages", "Ruled, dotted & blank layouts", "Satisfying flip sound effects",].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#e8fdf6" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#1a8a60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#1a1830" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FlipBook component */}
          <div className="lg:w-3/5 w-full">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(26,138,96,0.12)" }}>
              <FlipBook />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 px-8 py-20 md:px-20 md:py-28 lg:px-32 lg:py-32">

          {/* ImageGrid */}
          <div className="md:w-3/5 w-full">
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(90,80,200,0.12)" }}><ImageGrid /></div>
          </div>

          {/* Text */}
          <div className="md:w-2/5">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"style={{ background: "#f0eeff", color: "#5a50c8" }}>✦ AI assistant</span>
            <p className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 leading-tight" style={{ color: "#1a1830" }}>Writing with Notebook's advanced AI</p>
            <p className="text-base leading-relaxed mb-7" style={{ color: "#6b6880", maxWidth: "380px" }}>Context-aware suggestions, grammar fixes, tone adjustments and idea expansion — an AI that reads between your lines and writes beside you.</p>

            {/* AI Feature chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { label: "✦ Smart suggestions", bg: "#f0eeff", color: "#5a50c8" },
                { label: "✦ Grammar fixes",     bg: "#e8fdf6", color: "#1a8a60" },
                { label: "✦ Expand ideas",      bg: "#fff5ea", color: "#c06810" },
                { label: "✦ Adjust tone",       bg: "#fff0ef", color: "#c02018" },
              ].map(c => (
                <span key={c.label} className="text-xs font-semibold rounded-full px-3.5 py-1.5 cursor-pointer transition-all duration-200" style={{ background: c.bg, color: c.color }} 
                  onMouseEnter={e => {e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";}}
                  onMouseLeave={e => {e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none";}}>
                  {c.label}
                </span>
              ))}
            </div>

            <Link to="/ai">
              <button className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 text-white cursor-pointer"
                style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)", boxShadow: "0 4px 20px rgba(90,80,200,0.35)" }} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 28px rgba(90,80,200,0.5)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(90,80,200,0.35)"}>
                Try AI assistant
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </Link>
          </div>
        </div>

        {/* BOTTOM CTA STRIP */}
        <div className="relative px-8 py-20 md:px-20 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, #3b3598 0%, #2d2b6b 100%)" }}>
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px",}}/>
          {/* Rainbow top border */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{background:"linear-gradient(90deg,#ff4f38 0%,#f5a623 20%,#7ed957 35%,#38c9b0 50%,#60b8ff 65%,#7b72e0 80%,#ff7eb3 100%)",}}/>

          <div className="relative z-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-4"style={{ color: "rgba(255,255,255,0.5)" }}>Start for free</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Your notebook is waiting.<br />
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-blue-400 text-transparent bg-clip-text">Open it today.</span>
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>Free to start. No credit card. Just you and the page.</p>
            <Link to="/register">
              <button className="px-8 py-3 bg-white text-indigo-800 hover:bg-indigo-50 transition-all duration-200 rounded-full text-base font-bold shadow-xl hover:-translate-y-0.5 cursor-pointer"
                style={{ boxShadow: "0 8px 32px rgba(255,255,255,0.2)" }}> Create my notebook →
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  export default Home