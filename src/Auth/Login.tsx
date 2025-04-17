
import { Button, Card, CardContent, Input } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router";
import logo from "../assets/logo.png";


function Login() {

    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="flex md:w-96 mb-5">
            <Link to="/">
              <img src={logo} alt="Notebook" className="h-12 object-contain" />
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-96 p-6 shadow-lg bg-white rounded-2xl">
              <CardContent>
                <h2 className="text-2xl font-semibold text-center mb-6"> Login</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">  Email</label>
                  <Input  type="email"  placeholder="Enter your email"  className="w-full p-2 border rounded" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm mb-2"> Password </label>
                  <Input type="password" placeholder="Enter your password" className="w-full p-2 border rounded" />
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"> Login </Button>
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