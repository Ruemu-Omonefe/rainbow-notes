import React, { useEffect, useRef } from "react";
import styles from "../styles/flipBook.module.css";
import img from "../assets/book.png"
import img2 from "../assets/book2.png"

const FlipBook: React.FC = () => {
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elBook = bookRef.current;
    if (!elBook) return;

    //controls which page is currently "open" or flipped.
    elBook.style.setProperty("--c", "0");

    //Finds all child elements with class of page
    const pages = elBook.querySelectorAll<HTMLElement>(`.${styles.page}`);
    //Assigns a CSS variable --i with the page’s index for each page
    pages.forEach((page, idx) => {
      page.style.setProperty("--i", idx.toString());
      page.addEventListener("click", (evt) => {
        if ((evt.target as HTMLElement).closest("a")) return;
        const curr = (evt.target as HTMLElement).closest(`.${styles.back}`) ? idx : idx + 1;
        elBook.style.setProperty("--c", curr.toString());
      });
    });
  }, []);

  return (
    <div className={styles.flipBookContainer}>
      <div className={styles.book} ref={bookRef}>
        
        {/* Page 1 */}
        <div className={styles.page}>
          <div className={`${styles.front} ${styles.cover}`}>
            <h1 className="text-xl">Rainbow Note</h1>
            <p>2025 Edition.<br />Designed & Built with Care</p>
          </div>
          <div className={styles.back}>
            <h2>The Feel of Real Paper</h2>
            <p>A digital notebook crafted to recreate the warmth, motion, and immersion of flipping through real pages.</p>
          </div>
        </div>

        {/* Page 2 */}
        <div className={styles.page}>
          <div className={styles.front}>
            <h2>Thoughts. Ideas. Stories.</h2>
            <p>Capture your daily reflections, spontaneous ideas, and creative sparks in a space that feels natural.</p>
            <p>Every page turn is smooth, responsive, and intentionally designed.</p>
            <p>Built with modern frontend tools, yet inspired by classic notebooks.</p>
          </div>
          <div className={styles.back}>
            <img src={img} alt="Inspiration visual" />
            <p>A glimpse into inspiration.</p>
          </div>
        </div>

        {/* Page 3 */}
        <div className={styles.page}>
          <div className={styles.front}>
            <h2>AI-Assisted Writing</h2>
            <p>Smart suggestions, grammar refinement, tone adjustments, and idea expansion — an assistant that writes with you, not for you.</p>
          </div>
          <div className={styles.back}>
            <img src={img2} alt="AI illustration" />
            <p>Where creativity meets intelligence.</p>
          </div>
        </div>

        {/* Page 4 */}
        <div className={styles.page}>
          <div className={styles.front}>
            <h2>Immersive Interaction</h2>
            <p>Clicking the edge of a page triggers a realistic 3D flip animation — bringing depth and motion to your writing.</p>
          </div>
          <div className={styles.back}>
            <p>Designed for fluid navigation, natural gestures, and an engaging reading experience.</p>
          </div>
        </div>

        {/* Final Page */}
        <div className={styles.page}>
          <div className={styles.front}>
            <img src="https://picsum.photos/id/1073/600/600" alt="Moments visual" />
            <p>Moments worth remembering.</p>
          </div>
          <div className={`${styles.back} ${styles.cover}`}>
            <h3>The End Or Just the Beginning. <br /> Your Choice</h3>
            <p>Thank you for exploring Rainbow Note.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlipBook;
