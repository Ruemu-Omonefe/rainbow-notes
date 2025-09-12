import styles from "../styles/singleNote.module.css";
import StarIcon from "@mui/icons-material/Star";

const FlipBook: React.FC = () => {


  return (
   <>
    <div className={`${styles.grid} grid grid-cols-3 items-center px-5 pt-5 w-full`}>
      <div></div>
      <div className={`${styles.textCenter} text-center font-semibold text-2xl sm:text-3xl`}>Title</div>
      <div className={`flex justify-end`}>
        <StarIcon className={`${styles.starIcon} text-amber-500`}></StarIcon>
      </div>
    </div>
    <div className={styles.flipBookContainer} >
      <div className={styles.book} ref={null}>
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
