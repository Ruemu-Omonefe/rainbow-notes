import SwapVertIcon from '@mui/icons-material/SwapVert';
import style from "../styes/notebookList.module.scss"
import img from "../assets/book.png"

function NotebookList() {
  const noteBookCover = {
    id: '1',
    title: 'Math Notes',
    coverStyle: 'lined',
  }

    return (
      <>
        <div className="flex items-center p-5">
          <p className="absolute left-1/2 transform -translate-x-1/2">Notebook</p>
          <SwapVertIcon className="ml-auto" />
        </div>

        <div className="p-5">
        <div className={`${style.notebookCover} ${style.leather}`}>
          wdoweo
        </div>
        </div>


      </>
    )
  }
  
  export default NotebookList