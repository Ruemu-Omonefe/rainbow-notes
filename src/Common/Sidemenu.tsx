import { Link } from "react-router-dom"
import logo from "../assets/logo.png";
import AddIcon from '@mui/icons-material/Add';

function Sidemenu() {

    return (
      <>
      <div className="flex justify-between items-center w-full bg-white shadow-md px-6 py-3">
        <div className="">
        <Link to="/">
          <img src={logo} alt="Notebook" className="h-6 object-contain" />
        </Link>
        </div>

        <nav className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 bg-black transition rounded-sm"><AddIcon className="font-bold"/></Link>
        <Link to="/features" className="text-gray-700 hover:text-indigo-600 transition">Features</Link>
        <Link to="/ai" className="text-white transition rounded-full h-8 w-8 bg-amber-900 flex justify-center items-center text-3xl">o</Link>
      </nav>

      </div>
      </>
    )
  }
  
  export default Sidemenu