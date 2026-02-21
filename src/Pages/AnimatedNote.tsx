import { useEffect, useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function AnimatedNote() {
  const [text, setText] = useState("");
  const [writingDone, setWritingDone] = useState(false);
  const [penPosition, setPenPosition] = useState({ left: 0, top: 0 });
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const message = "AI is changing the world in ways we never imagined.";
  const speed = 280;
  const resetDelay = 7000;

  useEffect(() => {
    let index = 0;
    setWritingDone(false);
    setText("");

    const interval = setInterval(() => {
      if (index < message.length) {
        setText(() => message.slice(0, index + 1));
        index++;
      } else {
        setWritingDone(true);
        clearInterval(interval);
        setTimeout(() => {
          setText("");
          setWritingDone(false);
        }, resetDelay);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [writingDone]);

  // Track pen movement when text updates
  useEffect(() => {
    if (textRef.current && text.length > 0) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      range.setStart(textRef.current.firstChild as Node, text.length - 1); // Move to last character
      range.setEnd(textRef.current.firstChild as Node, text.length);
      
      const rect = range.getBoundingClientRect(); // Get last character position
      const parentRect = textRef.current.getBoundingClientRect();

      setPenPosition({
        left: rect.left - parentRect.left + 5, // Adjust pen to be close to text
        top: rect.top - parentRect.top - 14,
      });

      selection?.removeAllRanges(); // Clean up selection
    }
  }, [text]);

  return (
    <div className="mt-10">
      <div className="relative sm:w-80 w-68 h-56 bg-gray-100 rounded-lg shadow-lg p-6 text-gray-900 transform rotate-2 overflow-hidden">
        <p className="text-lg italic">"Jot down your ideas..."</p>

        {/* Animated Text */}
        <p ref={textRef} className="text-lg font-semibold mt-4 relative whitespace-pre-wrap">
          {text}
          {/* Animated Pen */}
          {!writingDone && (
            <span className="absolute text-blue-500 text-3xl transition-all duration-150"
              style={{ left: `${penPosition.left}px`, top: `${penPosition.top}px`, }}>
              <EditIcon className="animate-bounce" />
            </span>
          )}
        </p>

        {/* {writingDone && (
          <div className="mt-3.5 flex items-start gap-2 rounded-r-lg" style={{padding: "10px 12px", background: "rgba(90,80,200,0.07)", borderLeft: "2.5px solid #5a50c8", animation: "fadeIn 0.4s ease both",}}>
            <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#5a50c8,#3b3598)" }}>
              <span className="text-white font-bold" style={{ fontSize: "0.55rem" }}>AI</span>
            </div>
            <div>
              <span className="block font-bold tracking-wider uppercase mb-1" style={{ fontSize: "0.6rem", color: "rgba(90,80,200,0.6)" }}>Suggestion</span>
              <p className="italic leading-relaxed" style={{ fontSize: "0.78rem", color: "#5a50c8" }}>
                Continue: "…and Rainbow Notes helps you capture every spark."
              </p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
