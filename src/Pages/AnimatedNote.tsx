import { useEffect, useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function AnimatedNote() {
  const [text, setText] = useState("");
  const [writingDone, setWritingDone] = useState(false);
  const [penPosition, setPenPosition] = useState({ left: 0, top: 0 });
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const message = "AI is changing the world in ways we never imagined.";
  const speed = 280;
  const resetDelay = 5000;

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
      <div className="relative w-80 h-56 bg-gray-100 rounded-lg shadow-lg p-6 text-gray-900 transform rotate-2 overflow-hidden">
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
      </div>
    </div>
  );
}
