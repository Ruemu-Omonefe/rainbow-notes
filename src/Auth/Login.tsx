
import { Button, Card, CardContent, Input } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import axios from "axios";


function Login() {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL;
  const toggleEye = () => {
    setOpen(!open);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
     setFormData({ ...formData, [event.target.name]: event.target.value });
  }
    
  async function handleSubmit() {
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    try {
      console.log("Submitting login form:", formData);
      setError("");
      setIsLoading(true);
      if (!API_URL) {
        throw new Error("API URL is not defined");
      }
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      nextAction(response);
      
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  function nextAction(response: { data: { token: any; user: any; }; }) {
    const { token, user } = response.data;
      console.log("Login successful:", response);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/notebooks");
  }

  async function googleLogin() {
    // try{
    //     const response = await axios.post(`${API_URL}/api/auth/google`,);
    //     nextAction(response)
        
    //   }catch (err: any) {
    //     console.error("Login error:", err);
    //     setError(err.message || "Login failed");
    // } finally {
    //     setIsLoading(false);
    // }

     window.location.href = `${API_URL}/api/auth/google`;
  }
  async function githubLogin() {
    try{
        const response = await axios.post(`${API_URL}/api/auth/github`,);
        nextAction(response)
        
      }catch (err: any) {
        console.error("Login error:", err);
        setError(err.message || "Login failed");
    } finally {
        setIsLoading(false);
    }
  }

    return (
      <>
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="w-96 p-6 shadow-lg bg-white rounded-2xl">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}
            <Link to="/">
              <img src={logo} alt="Notebook" className="h-12 mt-5 ml-3 object-contain" />
            </Link>
              <CardContent>
                <h2 className="text-2xl font-semibold">Sign in</h2>
                <p className="mb-6 text-gray-700">To access</p>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Username</label>
                  <Input  type="text"  placeholder="Enter your username"  className="w-full p-1.5 border rounded" name="username" value={formData.username} onChange={handleChange}/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Email</label>
                  <Input  type="email"  placeholder="Enter your email"  className="w-full p-1.5 border rounded" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2"> Password </label>
                <div className="relative w-full">  
                <Input type={open ? 'text': 'password'} placeholder="Enter your password" className="w-full p-1.5 pr-10 border rounded" name="password" value={formData.password} onChange={handleChange}/>  
                <span className=" absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                  { open ? <VisibilityOffIcon  onClick={toggleEye}/> : <VisibilityIcon  onClick={toggleEye}/> } 
                </span>
              </div>  
              </div>
                <Button variant="contained" size="large" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg" onClick={handleSubmit}>Login </Button>
                <div className="mt-7">
                  <p className="text-sm mb-2 font-semibold">Or sign in with</p>
                  <div className="flex gap-4 ml-2">
                    <img src={google} alt="Google logo" className="h-6 cursor-pointer" onClick={googleLogin} />
                    <img src={github} alt="GitHub logo" className="h-6 cursor-pointer" onClick={githubLogin} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500 font-semibold"> Sign Up</Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }
  
  export default Login


  export async function Loader() {
    return (
      <>
        <p className="">Loading...</p>
      </>
    )
  }