import { Link } from "react-router";

function NotAuthorized() {

    
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-4">
            <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl shadow-lg max-w-md w-full text-center p-10 relative bg-gradient-to-r from-blue-300 to-pink-200 rounded-xl opacity-80">
                <div className="text-7xl animate-bounce mb-4">😔</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
                <p className="text-gray-700 mb-6 animate-pulse"> You don’t have permission to view this page. Please log in to continue.</p>
                <Link to="../login"
                    className="inline-block transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105"
                    onClick={() => console.log("Navigating to login page")}> Go to Login
                </Link>
                <div className="absolute bg-gradient-to-r from-blue-400 to-pink-300 rounded-xl blur opacity-30"></div>
            </div>
        </div>
      </>
    );
  }
  
  export default NotAuthorized