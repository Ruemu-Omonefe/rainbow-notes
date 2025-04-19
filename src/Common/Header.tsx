import { Link } from "react-router-dom"
import { useState } from "react";
import logo from "../assets/logo2.png";
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Header() {

  const [selectedName, setSelectedName] = useState('Notebooks');
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [addMenu, setAddMenu] = useState(false);

  return (
    <>
      <div className="relative w-full bg-white shadow-md px-2 sm:px-4 md:px-6 py-1 h-[60px] flex items-center">
        {/* Logo */}
        <div className="absolute left-2 sm:left-4 md:left-6 flex items-center gap-2">
          <Link to="/" className="flex gap-1 items-center">
            <img src={logo} alt="Notebook" className="h-5 md:h-6 object-contain" />
            <p className="flex" style={{ fontFamily: 'Poppins' }}>Rainbow Note </p>
          </Link>
        </div>

        {/* Middle: First Nav Dropdown (Mobile) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:bg-gray-200 rounded-sm">
            {selectedName} <ArrowDropDownIcon />
          </button>
          {menuOpen && (
            <div className="absolute mt-2 bg-white shadow-md rounded z-10">
              <Link to="/notebooks" className={`p-2 flex ${selectedName === 'Notebooks' ? 'bg-gray-200 font-bold' : ''}`}
                onClick={() => {setSelectedName('Notebooks'); setMenuOpen(false);}}>
                <MenuBookIcon className="inline mr-2" /> Notebooks
              </Link>
              <Link to="/recordings" className={`p-2 flex ${selectedName === 'Recordings' ? 'bg-gray-200 font-bold' : ''}`}
                onClick={() => {setSelectedName('Recordings'); setMenuOpen(false);}} >
                <KeyboardVoiceIcon className="inline mr-2" /> Recordings
              </Link>
              <Link to="/recordings" className={`p-2 flex ${selectedName === 'Recordings' ? 'bg-gray-200 font-bold' : ''}`}
                onClick={() => {setSelectedName('Recordings'); setMenuOpen(false);}}>
                <KeyboardVoiceIcon className="inline mr-2" /> Recordings
              </Link>
            </div>
          )}
        </div>

        {/* Middle: First Nav (Desktop) */}
        <nav className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Tooltip title="Notebooks" arrow placement="bottom-start">
            <Link to="notebooks" className={`text-gray-700 hover:bg-gray-200 rounded-sm p-2 ${selectedName === 'Notebooks' ? 'bg-gray-200' : ''}`}
              onClick={() => {setSelectedName('Notebooks'); }}>
              <MenuBookIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Recordings" arrow placement="bottom-start">
            <Link to="notebooks"  className={`text-gray-700 hover:bg-gray-200 rounded-sm p-2 ${selectedName === 'Recordings' ? 'bg-gray-200' : ''}`}
              onClick={() => {setSelectedName('Recordings');}} >
              <KeyboardVoiceIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Notebooks" arrow placement="bottom-start">
            <Link to="notebooks" className={`text-gray-700 hover:bg-gray-200 rounded-sm p-2 ${selectedName === 'Notebooks' ? 'bg-gray-200' : ''}`}
              onClick={() => {setSelectedName('Notebooks');}}>
              <MenuBookIcon />
            </Link>
          </Tooltip>
        </nav>

        {/* Right Nav Dropdown (Mobile) */}
        <div className="absolute right-2 sm:right-4 md:hidden">
          <button onClick={() => {setMoreMenuOpen(!moreMenuOpen); setAddMenu(false);}} className="text-gray-700 hover:bg-gray-200 rounded-sm p-2">
            <MoreVertIcon />
          </button>
          {moreMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded z-10 py-1 flex flex-col items-center">
               {/* Menu for adding new notes */}
               <div className="relative">
                  <div className="block px-4 py-2" onClick={() => setAddMenu(prev => !prev)}>
                    <span className="rounded-sm bg-black p-1 text-white flex justify-center">
                      <AddIcon />
                    </span>
                  </div>
                  {addMenu && (
                    <div className="fixed top-17 right-20 bg-black text-white shadow-lg rounded z-50 p-3 w-48 space-y-2">
                      <Link to="/" className="block px-4 py-2 hover:bg-neutral-700" onClick={() => { setAddMenu(false); setMoreMenuOpen(false); }}>
                        <MenuBookIcon /> Notebook
                      </Link>
                      <Link to="/" className="block px-4 py-2 hover:bg-neutral-700" onClick={() => { setAddMenu(false); setMoreMenuOpen(false); }}>
                        <KeyboardVoiceIcon /> Audio
                      </Link>
                    </div>
                  )}

                </div>
              {/* Menu Ends */}
              <Link to="/" className="block px-4 py-2" onClick={() => setMoreMenuOpen(false)}>
                <SettingsIcon />
              </Link>
              <Link to="/" className="block px-4 py-2" onClick={() => setMoreMenuOpen(false)}>
                <SearchIcon />
              </Link>
              <Link to="/ai" className="block px-4 py-2" onClick={() => setMoreMenuOpen(false)}>
                <div className="text-white rounded-full h-8 w-8 bg-amber-900 flex justify-center items-center">
                  <p className="text-3xl -translate-y-1.25">o</p>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Right Nav (Desktop) */}
        <nav className="hidden md:flex absolute right-4 space-x-6 items-center">
          {/* <Link to="/" className="text-white bg-black transition rounded-sm flex items-center p-1">
            <AddIcon />
          </Link> */}
          <div className="relative">
            <button onClick={() => setAddMenu(!addMenu)} className="text-white bg-black transition rounded-sm flex items-center p-1">
              <AddIcon />
            </button>
            {addMenu && (
              <div className="absolute left-0 mt-4 py-2 bg-black text-white shadow-lg rounded z-10 min-w-max">
                <Link to="/" className="block px-4 py-2 hover:bg-neutral-700 " onClick={() => setMoreMenuOpen(false)}>
                  <MenuBookIcon /> Notebook
                </Link>
                <Link to="/" className="block px-4 py-2 hover:bg-neutral-700 " onClick={() => setAddMenu(false)}>
                  <KeyboardVoiceIcon /> Audio
                </Link>
              </div>
            )}
          </div>

          <Link to="/" className="text-gray-700 hover:bg-gray-200 rounded-sm flex items-center p-2">
            <SettingsIcon />
          </Link>
          <Link to="/" className="text-gray-700 rounded-sm flex items-center px-2">
            <SearchIcon />
          </Link>
          <Link to="/ai" className="text-white rounded-full h-8 w-8 bg-amber-900 flex justify-center items-center">
            <p className="text-3xl -translate-y-1">o</p>
          </Link>
        </nav>  
      </div>
    </>
  )
}

export default Header