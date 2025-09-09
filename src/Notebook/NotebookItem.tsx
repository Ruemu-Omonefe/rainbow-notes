import styles from "../styles/notebookItem.module.css";

import { useEffect, useRef } from "react";

const NotebookItem = () => {
  const notebookRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (notebookRef.current && window.$ && window.$.fn.turn) {
  //     const $el = window.$(notebookRef.current);

  //     if (!$el.data("initialized")) {
  //       // Initialize the flipbook
  //       $el.turn({
  //         width: 800,
  //         height: 600,
  //         autoCenter: true,
  //         elevation: 50,
  //         gradients: true,
  //         acceleration: true,
  //         display: "double",
  //         duration: 1000,
  //       });
  //       $el.data("initialized", true);
  //     }

  //     return () => {
  //       if ($el.turn) {
  //         try {
  //           $el.turn("destroy").removeData("initialized");
  //         } catch (e) {
  //           console.warn("Turn.js cleanup skipped:", e);
  //         }
  //       }
  //     };
  //   }
  // }, []);

  // Allow click anywhere to flip (for testing)



  useEffect(() => {
  if (notebookRef.current && window.$ && window.$.fn.turn) {
    const $el = window.$(notebookRef.current);

    if (!$el.data("initialized")) {
      const isMobile = window.innerWidth < 900;

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

    return () => {
      if ($el.turn) {
        try {
          $el.turn("destroy").removeData("initialized");
        } catch (e) {
          console.warn("Turn.js cleanup skipped:", e);
        }
      }
    };
  }

  $el.on("click", ".page", function () {
  const page = $el.turn("page");
  const pages = $el.turn("pages");

  if (page < pages) {
    $el.turn("next");
  } else {
    $el.turn("previous");
  }
});
}, []);


  return (
    <>
    <div className={styles.notebookContainer}>
      <div ref={notebookRef} className={styles.notebook}>
        {/* Front Cover */}
        <div className={styles.page}>
          <div className={styles.cover}>
            My Notebook
          </div>
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
          <div className={`${styles.pageContent} ${styles.alternatePage} ${styles.linedBackground}`}>
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
          <div className={`${styles.pageContent} ${styles.alternatePage} ${styles.linedBackground}`}>
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
     <div className={styles.controls}>
  <button onClick={() => window.$(notebookRef.current).turn("previous")}>Prev</button>
  <button onClick={() => window.$(notebookRef.current).turn("next")}>Next</button>
</div>
    </>
  );
};

export default NotebookItem;