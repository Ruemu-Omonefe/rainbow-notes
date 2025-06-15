import SwapVertIcon from '@mui/icons-material/SwapVert';
import style from "../styles/notebookList.module.scss"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserNotes } from '../shared/services/commonService';
import { Notebook } from '../shared/interfaces/notebook.interface';
import NoteLoader from '../Common/Loader/Loader';


function NotebookList() {

  let [noteList, setNoteList] = useState<Notebook[]>([]);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  const [isLoading, setIsLoading] = useState(false)


  async function getNotes(){
    try{
      setIsLoading(true);
      const response = await getUserNotes(user._id || user.id);
      console.log(response);
      setNoteList(response.data.notes);
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getNotes();
  }, [])

    return (
      <>
      { isLoading ? (<NoteLoader/>) :
        (
          <>
            <div className="grid grid-cols-3 items-center px-5 pt-5 w-full">
              <div></div>
              <p className="text-center font-semibold text-2xl sm:text-3xl"> Notebooks</p>
              <div className="flex justify-end">
                <SwapVertIcon />
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
              {noteList.map(notebook => (
                <Link to='/single-note' key={notebook._id}>
                  <div className={style.cover} style={{ backgroundImage: `url(${notebook.coverDesign})`}}>
                  </div>
                    <div className="text-black font-medium text-center" style={{fontFamily: 'Roboto'}}>{notebook.title}</div>
                </Link>
              ))}
            </div>
          </>
        )
      }
        
      </>
    )
  }
  
  export default NotebookList