// import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import img from "../assets/img1.png"
// import book from "../assets/book.png"
// import book2 from "../assets/book2.png"
// import book3 from "../assets/book3.png"
import AnimatedNote from "./AnimatedNote";
import FlipBook from "./flipBook";


function Home() {

    return (
      <>
      {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-400 to-indigo-800 text-white py-12">
          {/* Hero Section */}
          <div className="text-center px-8">
            <h1 className="text-5xl font-bold tracking-wide mb-4 animate-fadeIn">
              Welcome to Rainbow Notes
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto animate-fadeIn delay-150">
              Capture your thoughts, flip through pages like a real notebook,
              and enhance your writing with AI-powered suggestions.
            </p>

            {/* Call to Action */}
            <div className="mt-6 flex gap-4 justify-center">
              <Link to="/register">
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-2 border-2 border-white hover:bg-white hover:text-gray-900 transition rounded-full text-lg font-semibold">
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <AnimatedNote/>
          <h2 className="text-3xl md:text-5xl font-bold flex gap-5 justify-center mt-10 lg:mt-4 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            <span>Flip.</span>
            <span>Write.</span>
            <span>Imagine.</span>
          </h2>
        </div>
        {/* Next */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-8 pt-25 md:px-20 md:py-25 lg:p-25">
          <div className="md:w-3/5">
            <img src={img} alt="img" className="" />
          </div>
          <div className="md:w-2/5">
            <p className="text-3xl md:text-5xl font-semibold">The only limit is your imagination and lack of AI Usage</p>
          </div>
        </div>
        {/* Flip note section */}
        <div className="flex flex-col-reverse  lg:flex-row justify-between items-center gap-10 px-8 pt-25 md:px-20 md:py-25 lg:p-25">
          <div className="lg:w-2/5">
            <p className="text-3xl md:text-5xl font-semibold">Flip your note like a real notebook</p>
          </div>
          <div className="lg:w-3/5 w-full">
            <FlipBook/>
          </div>
        </div>
        {/* Next */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-8 pt-25 md:px-20 md:py-25 lg:p-25">
          <div className="md:w-3/5">
            <img src={img} alt="img" className=""/>
          </div>
          <div className="md:w-2/5">
            <p className="text-3xl md:text-5xl font-semibold">Writing with Notebook’s advanced AI assistant</p>
          </div>
        </div>
      </>
    );
  }
  
  export default Home