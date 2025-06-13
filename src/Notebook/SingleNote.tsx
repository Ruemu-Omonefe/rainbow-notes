import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/singleNote.module.css";
import StarIcon from "@mui/icons-material/Star";

const FlipBook: React.FC = () => {
  const bookRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const elBook = bookRef.current;
    if (!elBook) return;
    pages.current = Array.from(elBook.querySelectorAll<HTMLElement>(`.${styles.page}`));

    pages.current.forEach((page, idx) => {
      page.style.setProperty("--i", idx.toString());
    });
  }, []);

  // Inside FlipBook component
const handleStart = (x: number) => {
  setIsDragging(true);
  setStartX(x);
};

const handleEnd = (x: number) => {
  if (!isDragging) return;
  setIsDragging(false);
  const threshold = 40;

  if (x - startX > threshold && currentPage > 0) {
    setCurrentPage((prev) => prev - 1);
  } else if (startX - x > threshold && currentPage < pages.current.length - 1) {
    setCurrentPage((prev) => prev + 1);
  }
};

// Mouse
const handleMouseDown = (e: React.MouseEvent) => {
  if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
  handleStart(e.clientX);
};
const handleMouseUp = (e: React.MouseEvent) => {
  handleEnd(e.clientX);
};

// Touch
const handleTouchStart = (e: React.TouchEvent) => {
  if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
  handleStart(e.touches[0].clientX);
};
const handleTouchEnd = (e: React.TouchEvent) => {
  handleEnd(e.changedTouches[0].clientX);
};


  useEffect(() => {
    const elBook = bookRef.current;
    if (elBook) {
      elBook.style.setProperty("--c", currentPage.toString());
    }
  }, [currentPage]);

  return (
   <>
    <div className={`${styles.grid} grid grid-cols-3 items-center px-5 pt-5 w-full`}>
      <div></div>
      <div className={`${styles.textCenter} text-center font-semibold text-2xl sm:text-3xl`}>Title</div>
      <div className={`flex justify-end`}>
        <StarIcon className={`${styles.starIcon} text-amber-500`}></StarIcon>
      </div>
    </div>
    <div className={styles.flipBookContainer} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={styles.book} ref={bookRef}>
        {/* Front Cover */}
        <div className={styles.page}>
          <div className={`${styles.front} ${styles.cover}`}>
            <h1>Rainbow Note</h1>
          </div>
          <div className={styles.back}>
            <h2>Welcome Page</h2>
          </div>
        </div>

        {/* Pages */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div className={styles.page} key={i}>
            <div className={styles.front}>
              <textarea
                placeholder={`Page ${i * 2 + 1}`}
                className={styles.textarea}
              />
            </div>
            <div className={styles.back}>
              <textarea
                placeholder={`Page ${i * 2 + 2}`}
                className={styles.textarea}
              />
            </div>
          </div>
        ))}

        {/* Back Cover */}
        <div className={styles.page}>
          <div className={styles.front}>
            <p>Last page content</p>
          </div>
          <div className={`${styles.back} ${styles.cover}`}>
            <h3>That's all!</h3>
          </div>
        </div>
        <div className={`${styles.page} ${styles.lastPage}`}>
          <div className={styles.lastPage}>
          </div>
        </div>
      </div>
    </div>
   </>


  );
};

export default FlipBook;
