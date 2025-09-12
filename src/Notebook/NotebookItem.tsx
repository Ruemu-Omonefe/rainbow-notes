import styles from "../styles/notebookItem.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Switch } from "@mui/material";
import Page from "./Page";
import { getNoteById } from "../shared/services/commonService";
import img from '../assets/book-cover1.png';
declare global {
  interface Window {
    $: any;
  }
}


const NotebookItem = () => {
  const notebookRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 900;
  const [showPageFullMessage, setShowPageFullMessage] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noOfPages, setNoOfPages] = useState<number | null>(null);
  const [coverImage, setCoverImage] = useState<string>("");
  const [noteContent, setNoteContent] = useState<{ type: string; content: string }[]>([]);


  const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setShowControl(!showControl);
  };

    // Get note details
  useEffect(() => {
    const noteId = window.location.pathname.split("/").pop() || '';
    if (noteId) {
      getNoteById(noteId)
        .then((response) => {
          console.log("Note data:", response.data);
          setNoteTitle(response.data.title);
          setNoOfPages(response.data.numberOfPages || 2);
          // setCoverImage(response.data.coverDesign || "");
          setCoverImage(img);
          setNoteContent(response.data.content || []);
        })
        .catch((err) => {
          console.error("Error fetching note:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (!noOfPages) return;  // Wait until noOfPages is set

    if (notebookRef.current && window.$ && window.$.fn.turn) {
      const $el = window.$(notebookRef.current);

      if (!$el.data("initialized")) {
        const containerHeight = notebookRef.current?.offsetHeight || 600;
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
      // Edge click navigation for desktop(added manually as original functionality refused to work)
      const handleEdgeClick = (e: MouseEvent) => {
        if (!notebookRef.current) return;
        const $el = window.$(notebookRef.current);

        const rect = notebookRef.current.getBoundingClientRect();
        const edgeThreshold = 80;
        const page = $el.turn("page");
        const pages = $el.turn("pages");

        if (e.clientX - rect.left < edgeThreshold && page > 1) {
          $el.turn("previous");
        } else if (rect.right - e.clientX < edgeThreshold && page < pages) {
          $el.turn("next");
        }
      };

       // Change cursor when hovering near edges
      const handleMouseMove = (e: MouseEvent) => {
        if (!notebookRef.current) return;
        const rect = notebookRef.current.getBoundingClientRect();
        const edgeThreshold = 80;

        if (e.clientX - rect.left < edgeThreshold || rect.right - e.clientX < edgeThreshold ) {
          notebookRef.current.style.cursor = "pointer";
        } else {
          notebookRef.current.style.cursor = "default";
        }
      };

      const el = notebookRef.current;
      el?.addEventListener("click", handleEdgeClick);
      el?.addEventListener("mousemove", handleMouseMove);

      return () => {
        el?.removeEventListener("click", handleEdgeClick);
        el?.removeEventListener("mousemove", handleMouseMove);
        if (notebookRef.current && window.$) {
          const $el = window.$(notebookRef.current);
          try {
            $el.turn("destroy").removeData("initialized");
          } catch (e) {
            console.warn("Turn.js cleanup skipped:", e);
          }
        }
      };
    }
  }, [isMobile, noOfPages]);

  // Prevent typing past last line(show user alert)
  useEffect(() => {
    const container = notebookRef.current;
    if (!container) return;

    const handleInput = (e: Event) => {
      const textarea = e.target as HTMLTextAreaElement;

      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.value = textarea.value.slice(0, -1);
        setShowPageFullMessage(true);

        setTimeout(() => setShowPageFullMessage(false), 2000);
      }
    };

    const textareas = container.querySelectorAll("textarea");
    textareas.forEach((ta) => ta.addEventListener("input", handleInput));

    return () => {
      textareas.forEach((ta) => ta.removeEventListener("input", handleInput));
    };
  }, []);

  // Freeze pages with useMemo to prevent re-creation
  const pages = useMemo(() => {
    if (!noOfPages) return null;
    return Array.from({ length: noOfPages }).map((_, i) => (
      <Page key={i} index={i} pageContent={noteContent[i]} />
    ));
  }, [noOfPages]);

  if (!noOfPages) {
    return <div>Loading notebook...</div>;
  }


  return (
    <>
      <div className={`${styles.grid} grid grid-cols-3 items-center px-5 pt-1 w-full`}>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2`}>
            <p className="">Toggle control</p>
            <Switch checked={checked} onChange={handleControlChange} />
          </div>
           {/* Controls */}
          {showControl && (
            <div className={styles.controls}>
              <button onClick={() => window.$(notebookRef.current).turn("previous")}><ChevronLeftIcon /></button>
              <button onClick={() => window.$(notebookRef.current).turn("next")}><ChevronRightIcon /></button>
            </div>
          )}
        </div>
        <div className={`${styles.textCenter} text-center font-semibold text-2xl sm:text-2xl`}>{noteTitle}</div>
        <div className={`flex justify-end`}>
          <StarIcon className={`${styles.starIcon} text-amber-500`}></StarIcon>
        </div>
      </div>
      <div className={styles.notebookContainer}>
        {/* Alert message for full page */}
        {showPageFullMessage && (
          <div className={styles.pageFullMessage}>Page is full, move to next page to continue.</div>
        )}

        <div ref={notebookRef} className={styles.notebook}>
          {/* Front Cover */}
          <div className={styles.page}>
            <div className={styles.cover} style={{ backgroundImage: `url(${coverImage})` }}>My Notebook</div>
          </div>

          {/* Pages */}
          {pages}

          {/* Back Cover */}
          <div className={styles.page}>
            <div className={styles.cover} style={{ backgroundImage: `url(${coverImage})` }}>
              {/* <div className={styles.endTitle}>The End</div>
              <div className={styles.endText}>Thank you for using this notebook
                <br />
                <span className={styles.footer}>Created with React & Turn.js</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotebookItem;
