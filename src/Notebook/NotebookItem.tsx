import styles from "../styles/notebookItem.module.css";
import { useEffect, useRef, useState } from "react";

const NotebookItem = () => {
  const notebookRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 900;
  const [showPageFullMessage, setShowPageFullMessage] = useState(false);
  const [noOfPages, setNoOfPages] = useState(4);

  useEffect(() => {
    if (notebookRef.current && window.$ && window.$.fn.turn) {
      const $el = window.$(notebookRef.current);

      if (!$el.data("initialized")) {
        $el.turn({
          width: 800,
          height: 600,
          autoCenter: true,
          display: isMobile ? "single" : "double",
          elevation: 50,
          gradients: true,
          duration: 1000,
          acceleration: true,
        });

        console.log("Turn.js initialized with", $el.turn("pages"), "pages");

        $el.data("initialized", true);
      }
    }

    if (!isMobile) {
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

      const el = notebookRef.current;
      el?.addEventListener("click", handleEdgeClick);

      return () => {
        el?.removeEventListener("click", handleEdgeClick);
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
  }, []);

  // Auto-move overflow text to next page (disabled for now)
  //   useEffect(() => {
  //   const container = notebookRef.current;
  //   if (!container) return;

  //   const $el = window.$(container);

  //   const handleInput = (e: Event) => {
  //     const textarea = e.target as HTMLTextAreaElement;

  //     // Detect overflow
  //     if (textarea.scrollHeight > textarea.clientHeight) {
  //       const currentPage = $el.turn("page");
  //       const totalPages = $el.turn("pages");
  //       const extraText = textarea.value.split("").pop() || "";

  //       // Remove the last character from this textarea
  //       textarea.value = textarea.value.slice(0, -1);

  //       // If current page is LEFT and right page exists → move to right page
  //       if (currentPage % 2 === 1 && currentPage + 1 <= totalPages) {
  //         const rightPageEl = container.querySelector(
  //           `.page:nth-child(${currentPage + 1}) textarea`
  //         ) as HTMLTextAreaElement;

  //         if (rightPageEl) {
  //           rightPageEl.value += extraText;
  //           rightPageEl.focus();
  //         }
  //       } else if (currentPage < totalPages) {
  //         // Otherwise flip to the next spread
  //         $el.turn("next");

  //         setTimeout(() => {
  //           const nextPage = $el.turn("page");
  //           const nextPageEl = container.querySelector(
  //             `.page:nth-child(${nextPage}) textarea`
  //           ) as HTMLTextAreaElement;

  //           if (nextPageEl) {
  //             nextPageEl.value += extraText;
  //             nextPageEl.focus();
  //           }
  //         }, 500);
  //       }
  //     }
  //   };

  //   // Attach listeners
  //   const textareas = container.querySelectorAll("textarea");
  //   textareas.forEach((ta) => ta.addEventListener("input", handleInput));

  //   return () => {
  //     textareas.forEach((ta) => ta.removeEventListener("input", handleInput));
  //   };
  // }, []);

  // Prevent typing past last line and show message
  useEffect(() => {
    const container = notebookRef.current;
    if (!container) return;

    const handleInput = (e: Event) => {
      const textarea = e.target as HTMLTextAreaElement;

      // If content exceeds visible height → stop input
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.value = textarea.value.slice(0, -1); // remove last typed char
        setShowPageFullMessage(true);

        // Hide message after 2 seconds
        setTimeout(() => {
          setShowPageFullMessage(false);
        }, 2000);
      }
    };

    const textareas = container.querySelectorAll("textarea");
    textareas.forEach((ta) => ta.addEventListener("input", handleInput));

    return () => {
      textareas.forEach((ta) => ta.removeEventListener("input", handleInput));
    };
  }, []);

  return (
    <>
      <div className={styles.notebookContainer}>
        {/* Full page alert message */}
        {showPageFullMessage && (
          <div className={styles.pageFullMessage}>
            Page is full, move to next page to continue.
          </div>
        )}
        {/* Notebook */}
        <div ref={notebookRef} className={styles.notebook}>
          {/* Front Cover */}
          <div className={styles.page}>
            <div className={styles.cover}>My Notebook</div>
          </div>

          {/* Page 1 */}
          <div className={`${styles.page} left`}>
            <div className={`${styles.pageContent} ${styles.linedBackground}`}>
              <textarea
                className={styles.textarea}
                placeholder="Write here..."
              />
            </div>
          </div>

          {/* Page 2 */}
          <div className={`${styles.page} right`}>
            <div
              className={`${styles.pageContent} ${styles.alternatePage} ${styles.linedBackground}`}
            >
              <textarea
                className={styles.textarea}
                placeholder="More notes..."
              />
            </div>
          </div>

          {/* Page 3 */}
          <div className={`${styles.page} left`}>
            <div className={`${styles.pageContent} ${styles.linedBackground}`}>
              <textarea
                className={styles.textarea}
                placeholder="Even more notes..."
              />
            </div>
          </div>

          {/* Page 4 */}
          <div className={`${styles.page} right`}>
            <div
              className={`${styles.pageContent} ${styles.alternatePage} ${styles.linedBackground}`}
            >
              <textarea
                className={styles.textarea}
                placeholder="Additional notes..."
              />
            </div>
          </div>

          {/* Back Cover */}
          <div className={styles.page}>
            <div className={styles.backCover}>
              <div className={styles.endTitle}>The End</div>
              <div className={styles.endText}>
                Thank you for using this notebook
                <br />
                <span className={styles.footer}>
                  Created with React & Turn.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className={styles.controls}>
        <button onClick={() => window.$(notebookRef.current).turn("previous")}>
          Prev
        </button>
        <button onClick={() => window.$(notebookRef.current).turn("next")}>
          Next
        </button>
      </div>
    </>
  );
};

export default NotebookItem;
