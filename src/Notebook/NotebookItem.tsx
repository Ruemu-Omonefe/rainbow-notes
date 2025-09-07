import styles from '../styles/notebookItem.module.css';

import React, { useState, useRef, useEffect } from 'react';

interface Page {
  id: number;
  content: string;
  isFlipped: boolean;
}

const Notebook: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: 1, content: '', isFlipped: false },
    { id: 2, content: '', isFlipped: false },
    { id: 3, content: '', isFlipped: false },
    { id: 4, content: '', isFlipped: false },
    { id: 5, content: '', isFlipped: false },
    { id: 6, content: '', isFlipped: false },
  ]);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0); // Index for two-page spreads
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isWriting, setIsWriting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const notebookRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate total spreads (each spread shows 2 pages on desktop, 1 on mobile)
  const totalSpreads = isMobile ? pages.length : Math.ceil(pages.length / 2);

  const nextPage = () => {
    if (currentSpreadIndex < totalSpreads - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      
      setTimeout(() => {
        setCurrentSpreadIndex(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentSpreadIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      
      setTimeout(() => {
        setCurrentSpreadIndex(prev => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const updatePageContent = (pageIndex: number, content: string) => {
    const updatedPages = [...pages];
    updatedPages[pageIndex].content = content;
    setPages(updatedPages);
  };

  const addPage = () => {
    setPages([...pages, { id: pages.length + 1, content: '', isFlipped: false }]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWriting) return;
      
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpreadIndex, isFlipping, isWriting, pages, isMobile]);

  // Get current pages based on view mode
  const getCurrentPages = () => {
    if (isMobile) {
      // Single page view
      return [pages[currentSpreadIndex]];
    } else {
      // Two-page spread view
      const leftPageIndex = currentSpreadIndex * 2;
      const rightPageIndex = leftPageIndex + 1;
      
      return [
        pages[leftPageIndex],
        rightPageIndex < pages.length ? pages[rightPageIndex] : null
      ];
    }
  };

  const currentPages = getCurrentPages();
  const isFirstSpread = currentSpreadIndex === 0;
  const isLastSpread = currentSpreadIndex === totalSpreads - 1;

  return (
    <div className={styles.notebookContainer}>
      <h1 className={styles.title}>3D Notebook</h1>
      <div className={styles.viewModeIndicator}>
        {isMobile ? 'Single Page View' : 'Dual Page View'}
      </div>
      
      <div className={`${styles.notebook} ${isMobile ? styles.mobile : styles.desktop}`} ref={notebookRef}>
        {/* Back Cover - only visible when on last page */}
        <div className={`${styles.cover} ${styles.backCover} ${isLastSpread ? styles.active : styles.hidden}`}>
          <div className={styles.coverContent}>
            <h2>The End</h2>
          </div>
        </div>

        {/* Pages */}
        {pages.map((page, index) => {
          // Determine if this page should be visible in current spread
          let pageVisible = false;
          if (isMobile) {
            pageVisible = index === currentSpreadIndex;
          } else {
            const spreadStart = currentSpreadIndex * 2;
            pageVisible = index === spreadStart || index === spreadStart + 1;
          }
          
          return (
            <div
              key={page.id}
              className={`${styles.page} ${pageVisible ? styles.active : ''} ${
                isFlipping && pageVisible && flipDirection === 'next' ? styles.flippingNext : ''
              } ${index < currentSpreadIndex * (isMobile ? 1 : 2) ? styles.turned : ''}`}
              style={{ zIndex: pages.length - index + 10 }}
            >
              <div className={styles.pageContent}>
                <textarea
                  className={styles.textArea}
                  value={page.content}
                  onChange={(e) => updatePageContent(index, e.target.value)}
                  onFocus={() => setIsWriting(true)}
                  onBlur={() => setIsWriting(false)}
                  placeholder="Write your thoughts here..."
                  disabled={!pageVisible}
                />
                <div className={styles.pageNumber}>{index + 1}</div>
              </div>
            </div>
          );
        }).reverse()}

        {/* Front Cover - only visible when on first page */}
        <div className={`${styles.cover} ${styles.frontCover} ${isFirstSpread ? styles.active : styles.hidden} ${
          isFlipping && isFirstSpread && flipDirection === 'next' ? styles.flippingNext : ''
        } ${currentSpreadIndex > 0 ? styles.turned : ''}`}>
          <div className={styles.coverContent}>
            <h2>My Notebook</h2>
            <p>Click the arrows or use keyboard arrows to navigate</p>
          </div>
        </div>
      </div>
      
      <div className={styles.controls}>
        <button
          onClick={prevPage}
          disabled={isFirstSpread || isFlipping}
          className={styles.button}
        >
          ← Previous
        </button>
        
        <span className={styles.pageCounter}>
          {isFirstSpread ? 'Front Cover' : 
           isLastSpread ? 'Back Cover' : 
           `Spread ${currentSpreadIndex + 1} of ${totalSpreads}`}
        </span>
        
        <button
          onClick={nextPage}
          disabled={isLastSpread || isFlipping}
          className={styles.button}
        >
          Next →
        </button>
      </div>
      
      <div className={styles.pageInfo}>
        Showing pages: {isMobile ? currentSpreadIndex + 1 : `${currentSpreadIndex * 2 + 1}-${Math.min((currentSpreadIndex * 2) + 2, pages.length)}`} of {pages.length}
      </div>
      
      <button
        onClick={addPage}
        className={styles.addButton}
        disabled={isFlipping}
      >
        Add Page
      </button>
    </div>
  );
};

export default Notebook;