import { useEffect, useRef } from "react";

const NotebookItem = () => {
  const notebookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notebookRef.current && window.$) {
      const $el = window.$(notebookRef.current);

      if (!$el.data("initialized") && $el.turn) {
        $el.turn({
          width: 800,
          height: 600,
          autoCenter: true,
        });
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
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
        padding: "20px",
      }}
    >
      <div
        ref={notebookRef}
        style={{
          width: "800px",
          height: "600px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Cover */}
        <div
          style={{
            background: "#2c3e50",
            color: "white",
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          My Notebook
        </div>

        {/* Page 1 */}
        <div style={{ background: "#fdf6e3", padding: "20px" }}>
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
            placeholder="Write here..."
          />
        </div>

        {/* Page 2 */}
        <div style={{ background: "#eee8d5", padding: "20px" }}>
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
            placeholder="More notes..."
          />
        </div>

        {/* Page 3 */}
        <div style={{ background: "#fdf6e3", padding: "20px" }}>
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
            placeholder="Even more notes..."
          />
        </div>
      </div>
    </div>
  );
};

export default NotebookItem;




/////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";

const NotebookItem = () => {
  const notebookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notebookRef.current && window.$) {
      const $el = window.$(notebookRef.current);

      if (!$el.data("initialized") && $el.turn) {
        $el.turn({
          width: 800,
          height: 600,
          autoCenter: true,
        });
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
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
        padding: "20px",
      }}
    >
      <div
        ref={notebookRef}
        style={{
          width: "800px",
          height: "600px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Cover */}
        <div
          style={{
            background: "#2c3e50",
            color: "white",
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          My Notebook
        </div>

        {/* Page 1 */}
        <div style={{ background: "#fdf6e3", padding: "20px" }}>
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
            placeholder="Write here..."
          />
        </div>

        {/* Page 2 */}
        <div style={{ background: "#eee8d5", padding: "20px" }}>
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
            placeholder="More notes..."
          />
        </div>

        {/* Page 3 */}
        <div style={{ background: "#fdf6e3", padding: "20px" }}>
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
            placeholder="Even more notes..."
          />
        </div>
      </div>
    </div>
  );
};

export default NotebookItem;



////////////////////////////////////////////////////////////////////////////////

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