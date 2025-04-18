import SwapVertIcon from '@mui/icons-material/SwapVert';
import style from "../styes/notebookList.module.scss"
import img from "../assets/cover.png"
import img2 from "../assets/book-cover3.png"
import { useState } from 'react';

function NotebookList() {
  const noteBookCover =[
    {
      id: 1,
      title: 'Pastel Pink',
      image: img2,
    },
    {
      id: 2,
      title: 'Leather Gold',
      image: img,
    },
  ]
  // const [title, setTitle] = useState('')

    return (
      <>
        <div className="flex items-center p-5">
          <p className="absolute left-1/2 transform -translate-x-1/2">Notebook</p>
          <SwapVertIcon className="ml-auto" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {noteBookCover.map(notebook => (
            <div key={notebook.id} className={style.cover}
              style={{ backgroundImage: `url(${notebook.image})`}}>
            </div>
          ))}
        </div>
      </>
    )
  }
  
  export default NotebookList