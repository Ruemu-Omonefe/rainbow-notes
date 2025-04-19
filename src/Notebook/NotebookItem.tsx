import React, { useState, useRef } from "react";
import StarIcon from '@mui/icons-material/Star';
import { motion, AnimatePresence } from "framer-motion";
import styles from '../styles/notebookItem.module.css';

function CustomFlipbook() {
  const [numPages, setNumPages] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageTexts, setPageTexts] = useState(Array(numPages).fill(""));

  // Refs to handle each page
  const pageRefs = useRef<(HTMLTextAreaElement | null)[]>(new Array(numPages).fill(null));

  // Variables to track dragging state
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const endXRef = useRef(0);

  const handleTextChange = (index: number, value: string) => {
    const updated = [...pageTexts];
    updated[index] = value;
    setPageTexts(updated);
  };

  const handlePageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count >= 1) {
      const total = count + 2;
      setNumPages(total);
      setPageTexts(Array(total).fill(""));
      setCurrentPage(0);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const renderPage = (index: number) => {
    if (index === 0) {
      return <div className={`${styles.page} ${styles.cover}`}>My Notebook</div>;
    }
    if (index === numPages - 1) {
      return <div className={`${styles.page} ${styles.back}`}>End of Notebook</div>;
    }
    return (
      <textarea
        ref={(el) => {
          pageRefs.current[index] = el;
        }}
        className={`${styles.page} ${styles.content}`}
        placeholder={`Write on page ${index}`}
        value={pageTexts[index]}
        onChange={(e) => handleTextChange(index, e.target.value)}
      />
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;  // Track the starting position of the drag
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    const flipThreshold = 100; // Set threshold for flipping

    if (deltaX > flipThreshold) {
      nextPage();
      draggingRef.current = false;
    } else if (deltaX < -flipThreshold) {
      prevPage();
      draggingRef.current = false;
    }
    endXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  const handleClickEdge = (e: React.MouseEvent) => {
    const pageWidth = (e.currentTarget as HTMLElement).offsetWidth;
    const edgeThreshold = 10;  // Edge detection threshold (10px)
    const mouseX = e.clientX;

    if (mouseX < edgeThreshold) {
      prevPage();  // Flip to previous page if clicked on the left edge
    } else if (mouseX > pageWidth - edgeThreshold) {
      nextPage();  // Flip to next page if clicked on the right edge
    }
  };

  return (
    <>
      {/* Header */}
      <div className={`${styles.grid} grid grid-cols-3 items-center px-5 pt-5 w-full`}>
        <div></div>
        <p className={`${styles.textCenter} text-center font-semibold text-2xl sm:text-3xl`}>Title</p>
        <div className={`${styles.flexEnd} flex justify-end`}>
          <StarIcon className={`${styles.starIcon} text-amber-500`} />
        </div>
      </div>

      {/* Page Count */}
      <div className={`${styles.textCenter} text-center my-4`}>
        <label className={`${styles.label} mr-2`}>Number of Pages:</label>
        <input
          type="number"
          min={1}
          value={numPages - 2}
          onChange={handlePageCountChange}
          className={`${styles.input} border px-2 py-1`}
        />
      </div>

      {/* Flipbook */}
      <div className={`${styles.flipbookContainer} flipbook-container`} 
           onMouseDown={handleMouseDown} 
           onMouseMove={handleMouseMove} 
           onMouseUp={handleMouseUp} 
           onClick={handleClickEdge}>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={`${styles.flipbookPage} flipbook-page`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {renderPage(currentPage)}
          </motion.div>
        </AnimatePresence>

        {/* Controls at the bottom */}
        <div className={`${styles.flipbookControls} flipbook-controls`}>
          <button onClick={prevPage} disabled={currentPage === 0}>&lt; Prev</button>
          <span>Page {currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === numPages - 1}>Next &gt;</button>
        </div>
      </div>
    </>
  );
}

export default CustomFlipbook;
