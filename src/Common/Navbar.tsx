import { Link } from "react-router-dom";
import img from "../assets/logo.png"
import { useState } from "react";


function Navbar() {
  const  [active, setaActive] = useState('navBar');
  const [isOpen, setIsOpen] = useState(false);

  //Toggle navbar function
  const showNavbar = ()=>{
      setaActive('navBar activeNavbar')
  }
  //Close navbar function
  const closeNavbar = ()=>{
      setaActive('navBar')
  }

  

    return (
      <>
        <section className="navBarSection">
          <header className="w-full bg-white shadow-md px-15 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-3">
            <img src={img} alt="Notebook" className="h-10 object-contain" />
            {/* <h1 className="text-xl font-semibold text-gray-800">AI Notebook</h1> */}
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
            <a href="/ai" className="text-gray-700 hover:text-indigo-600 transition">AI Assistant</a>
            <a href="/notebooks" className="text-gray-700 hover:text-indigo-600 transition">Resources</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-indigo-500 font-medium">Sign In</a>
            <a href="/signup" className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-600 hover:text-white transition rounded-full px-4 py-1">Get Started</a>
          </div>
          </header>
        </section>
      </>
    )
  }
  
  export default Navbar