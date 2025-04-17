import React, { useEffect, useRef } from "react";
import styles from "../styes/flipBook.module.css";
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
          <div className={`${styles.front} ${styles.cover}`}  >
            <h1 className="text-xl">Rainbow Note</h1>
            <p>2025.<br />Made with love</p>
          </div>
          <div className={styles.back}>
            <h2>Notebook feeling</h2>
            <p>Have a real notebook feeling</p>
          </div>
        </div>

        {/* Page 2 */}
        <div className={styles.page}>
          <div className={styles.front}>
            <p>This is the second page front.89998</p>
            <p>This is the second page front.89998</p>
            <p>This is the second page front.89998</p>
            <p>This is the second page front.89998</p>
            <p>This is the second page front.89998</p>
            <p>This is the second page front.89998</p>
            <p>This is the second page front.89998</p>
          </div>
          <div className={styles.back}>
            <img src={img} alt="img1" />
          </div>
        </div>

        {/* Page 3 */}
        <div className={styles.page}>
          <div className={styles.front}>
            <h2>AI usage</h2>
            <p>I used AI for achieving this flip.</p>
          </div>
          <div className={styles.back}>
            <img src={img2} alt="img1" />
          </div>
        </div>
        {/* Page 3 */}
        <div className={styles.page}>
          <div className={styles.front}>
            <h2>Nice UX</h2>
            <p>I used AI for achieving this flip.</p>
          </div>
          <div className={styles.back}>
            <p>Clicking a page edge triggers a 3D rotation.</p>
          </div>
        </div>

        {/* Final Page */}
        <div className={styles.page}>
          <div className={styles.front}>
            <img src="https://picsum.photos/id/1073/600/600" alt="img2" />
          </div>
          <div className={`${styles.back} ${styles.cover}`}>
            <h3>That's all!</h3>
            <p>Thanks for flipping through!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
