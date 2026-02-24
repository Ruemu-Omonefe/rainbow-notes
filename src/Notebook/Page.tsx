import styles from "../styles/notebookItem.module.css";

interface PageProps {
  index: number;
  pageContent?: {
    type: string;
    content: string;
  };
  onContentChange?: (index: number, content: string) => void;
}

const Page = ({ index, pageContent, onContentChange }: PageProps) => {

  return (
    <div className={`${styles.page} ${index % 2 === 0 ? "left" : "right"}`}>
        <div className={`${styles.pageContent} ${ index % 2 === 1 ? styles.alternatePage : ""} ${styles.linedBackground}`}>
        <textarea className={styles.textarea} placeholder={`Page ${index + 1} notes...`}           defaultValue={pageContent?.content || ""} onChange={(e) => onContentChange?.(index, e.target.value)}/>
        </div>
    </div>
  )
}

export default Page


