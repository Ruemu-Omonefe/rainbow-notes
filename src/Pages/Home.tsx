// import { Button } from "@mui/material"
import { Link } from "react-router-dom"
// import book from "../assets/book.png"
// import book2 from "../assets/book2.png"
// import book3 from "../assets/book3.png"
import AnimatedNote from "./AnimatedNote";

function Home() {

    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-400 to-indigo-800 text-white">
          {/* Hero Section */}
          <div className="text-center">
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
                <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-lg font-semibold">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-3 border-2 border-white hover:bg-white hover:text-gray-900 transition rounded-full text-lg font-semibold">
                  Log In
                </button>
              </Link>
            </div>
          </div>
          <AnimatedNote/>
          <h2 className="text-5xl font-bold flex gap-5 justify-center mt-4 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            <span>Flip.</span>
            <span>Write.</span>
            <span>Imagine.</span>
          </h2>

        </div>
      </>
    );
  }
  
  export default Home