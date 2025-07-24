import SwapVertIcon from '@mui/icons-material/SwapVert';
import style from "../styles/notebookList.module.scss"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import NoteLoader from '../Common/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotebooks } from '../store/notebookSlice';
import { AppDispatch } from '../store';
import { Notebook } from '../shared/interfaces/notebook.interface';


function NotebookList() {

  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const noteList = useSelector((state: any) => state.notebooks.items);
  const status = useSelector((state: any) => state.notebooks.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotebooks(user.id));
    }
  }, [status, dispatch]);

  return (
    <>
      {status === "loading" ? (<NoteLoader />) :
        (
          <>
            <div className="grid grid-cols-3 items-center px-5 pt-5 w-full">
              <div></div>
              <p className="text-center font-semibold text-2xl sm:text-3xl"> Notebooks</p>
              <div className="flex justify-end">
                <SwapVertIcon />
              </div>
            </div>
            {noteList.length === 0 ? (
              <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-500">No notebooks found. Start by creating one!</p>
              </div>
            ) : (
              // Display notebooks in a grid
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
                {noteList.map((notebook: Notebook) => (
                  <Link to={`/notebook/${notebook._id}`} key={notebook._id}>
                    <div className={style.cover} style={{ backgroundImage: `url(${notebook.coverDesign})` }}>
                    </div>
                    <div className="text-black font-medium text-center" style={{ fontFamily: 'Roboto' }}>{notebook.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )
      }
    </>
  )
}

export default NotebookList