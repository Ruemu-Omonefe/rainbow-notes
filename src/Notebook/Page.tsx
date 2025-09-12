import styles from "../styles/notebookItem.module.css";

interface pageProps {
  index: number;
  pageContent?:  {
    type: string;
    content: string;
  }
}

const Page = ({index, pageContent }: pageProps) => {

  return (
    <div className={`${styles.page} ${index % 2 === 0 ? "left" : "right"}`}>
        <div className={`${styles.pageContent} ${ index % 2 === 1 ? styles.alternatePage : ""} ${styles.linedBackground}`}>
        <textarea className={styles.textarea} placeholder={`Page ${index + 1} notes...`} value={pageContent?.content || ""} />
        </div>
    </div>
  )
}

export default Page


