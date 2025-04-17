import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img src={logo} alt="Notebook" className="h-12 object-contain" />
        </Link>
      </div>

      {/* Large Screen */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
        <Link to="/features" className="text-gray-700 hover:text-indigo-600 transition">Features</Link>
        <Link to="/ai" className="text-gray-700 hover:text-indigo-600 transition">AI Assistant</Link>
        <Link to="/notebooks" className="text-gray-700 hover:text-indigo-600 transition">Resources</Link>
      </nav>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/login" className="text-indigo-500 font-medium">Sign In</Link>
        <Link to="/register"
          className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-600 hover:text-white transition rounded-full px-4 py-1" >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon/> : <MenuIcon/>}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-18 m-auto w-10/12 bg-white shadow-md p-4 flex flex-col items-center space-y-4 md:hidden rounded-2xl">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/features" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link to="/ai" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>AI Assistant</Link>
          <Link to="/notebooks" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link to="/login" className="text-indigo-500 font-medium" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/signup"
            className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-600 hover:text-white transition rounded-full px-4 py-1"
            onClick={() => setMenuOpen(false)} >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
