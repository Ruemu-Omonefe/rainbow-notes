
import { Button, Card, CardContent, Input } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerUser } from "../shared/services/authService";
import NoteLoader from "../Common/Loader/Loader";


function Signup() {
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  

  const toggleEye = () => {
    setOpen(!open);
  }
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    try{
      console.log("Submitting signup form:", formData);
      setError("");
      setIsLoading(true);
      await registerUser(formData);
      setSuccessMessage("Registration Successful, Login to continue")
      setFormData({username: "", email: "", password: "" })
    } catch (error: any) {
      console.error("Signup error:", error.message);
      setError(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <>
      {isLoading ? (
        <NoteLoader />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-96 p-6 shadow-lg bg-white rounded-2xl">
            <Link to="/">
              <img src={logo} alt="Notebook" className="h-12 mt-5 ml-3 object-contain" />
            </Link>
              <CardContent>
                <h2 className="text-2xl font-semibold">Create an account</h2>
                <p className="mb-6 text-gray-700">To access</p>
                {error && (
                  <div className="bg-red-100 text-red-700 py-1.5 px-3 text-sm rounded mb-4">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-indigo-100 text-indigo-400  py-1.5 px-3 text-sm rounded mb-4">
                    {successMessage}
                  </div>
                )}
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
                <Button variant="contained" size="large" className="w-full" onClick={handleSubmit} sx={{backgroundColor: "oklch(0.585 0.233 277.117)", ":hover": {backgroundColor: "#4f39f6"}}}> Signup Now </Button>
                <p className="text-sm text-center text-gray-600 mt-4">
                  Have an account?{" "}
                  <Link to="/login" className="text-blue-500"> Sign In</Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  );
  }
  
  export default Signup