
import { Button, Card, CardContent, Input } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";


function Login() {

    const [open, setOpen] = useState(false);
  
    const toggleEye = () => {
      setOpen(!open);
    }
  

    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-96 p-6 shadow-lg bg-white rounded-2xl">
            <Link to="/">
              <img src={logo} alt="Notebook" className="h-12 mt-5 ml-3 object-contain" />
            </Link>
              <CardContent>
                <h2 className="text-2xl font-semibold">Sign in</h2>
                <p className="mb-6 text-gray-700">To access</p>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">  Email</label>
                  <Input  type="email"  placeholder="Enter your email"  className="w-full p-2 border rounded" />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2"> Password </label>
                <div className="relative w-full">  
                <Input type={open ? 'text': 'password'} placeholder="Enter your password" className="w-full p-2 pr-10 border rounded" />  
                <span className=" absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                  { open ? <VisibilityOffIcon  onClick={toggleEye}/> : <VisibilityIcon  onClick={toggleEye}/> } 
                </span>
              </div>  
              </div>
                <Button variant="contained" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg" > <Link to="/notebooks">Login</Link> </Button>
                <p className="text-sm text-center text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500"> Sign Up</Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }
  
  export default Login