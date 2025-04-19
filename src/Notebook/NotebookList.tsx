import SwapVertIcon from '@mui/icons-material/SwapVert';
import style from "../styles/notebookList.module.scss"
import img from "../assets/cover.png"
import img2 from "../assets/cover2.png"
import img3 from "../assets/cover3.png"
import img4 from "../assets/cover4.png"
import img5 from "../assets/cover5.png"
import img6 from "../assets/cover6.png"
import img7 from "../assets/cover7.png"
import img8 from "../assets/cover8.png"
import img9 from "../assets/cover9.png"
import img10 from "../assets/cover10.png"
import img11 from "../assets/cover11.png"
import img12 from "../assets/cover12.png"
import img13 from "../assets/cover13.png"
import img14 from "../assets/cover14.png"
import img15 from "../assets/cover15.png"
import img16 from "../assets/cover16.png"
import img17 from "../assets/cover17.png"
import img18 from "../assets/cover18.png"
import img19 from "../assets/cover19.png"
import img20 from "../assets/cover20.png"
import { Link } from 'react-router-dom';


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
    {
      id: 3,
      title: 'Leather Gold',
      image: img3,
    },
    {
      id: 5,
      title: 'Leather Gold',
      image: img5,
    },
    {
      id: 4,
      title: 'Leather Gold',
      image: img4,
    },
    {
      id: 6,
      title: 'Leather Gold',
      image: img6,
    },
    {
      id: 7,
      title: 'Pastel Hearts',
      image: img7,
    },
    {
      id: 8,
      title: 'Leather Gold',
      image: img8,
    },
    {
      id: 9,
      title: 'Matte Black',
      image: img9,
    },
    {
      id: 10,
      title: 'Leather Gold',
      image: img10,
    },
    {
      id: 11,
      title: 'Leather Gold',
      image: img11,
    },
    {
      id: 12,
      title: 'Leather Gold',
      image: img12,
    },
    {
      id: 13,
      title: 'Leather Gold',
      image: img13,
    },
    {
      id: 14,
      title: 'Leather Gold',
      image: img14,
    },
    {
      id: 15,
      title: 'Leather Gold',
      image: img15,
    },
    {
      id: 16,
      title: 'Leather Gold',
      image: img16,
    },
    {
      id: 17,
      title: 'Leather Gold',
      image: img17,
    },
    {
      id: 18,
      title: 'Leather Gold',
      image: img18,
    },
    {
      id: 19,
      title: 'Leather Gold',
      image: img19,
    },
    {
      id: 20,
      title: 'Leather Gold',
      image: img20
    },
  ]
  // const [title, setTitle] = useState('')

    return (
      <>
        <div className="grid grid-cols-3 items-center px-5 pt-5 w-full">
          <div></div>
          <p className="text-center font-semibold text-2xl sm:text-3xl"> Notebooks</p>
          <div className="flex justify-end">
            <SwapVertIcon />
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
          {noteBookCover.map(notebook => (
            <Link to='/single-note' key={notebook.id}>
              <div className={style.cover} style={{ backgroundImage: `url(${notebook.image})`}}>
              </div>
                <div className="text-black font-medium text-center" style={{fontFamily: 'Roboto'}}>{notebook.title}</div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  
  export default NotebookList