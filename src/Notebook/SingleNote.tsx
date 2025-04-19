import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/singleNote.module.css";

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.clientX;
    const threshold = 40;

    if (endX - startX > threshold && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else if (startX - endX > threshold && currentPage < pages.current.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const elBook = bookRef.current;
    if (elBook) {
      elBook.style.setProperty("--c", currentPage.toString());
    }
  }, [currentPage]);

  return (
<div
  className={styles.flipBookContainer}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
>
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


  );
};

export default FlipBook;