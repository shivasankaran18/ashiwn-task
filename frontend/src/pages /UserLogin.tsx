import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, User, Lock } from 'lucide-react'
import axios from 'axios'
import { BACKEND_URL } from '../../config.ts'
import { Link, useNavigate } from 'react-router-dom'

export function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate()
  const [flag,setFlag]=useState<boolean>(false)

  const handleSubmit = async () => {
    try{

      setFlag(true)
      console.log(email +" "+password)
      const res=await axios.post(`${BACKEND_URL}/api/user/login`,{
        email,
        password
  
      })

      localStorage.setItem("studenttoken",res.data.token)
      navigate("/user/detail")

    }
    catch{
      alert("error")
      setFlag(false)
    }
   

    
  };

  return (
    <div className="w-screen absolute left-0 top-0 h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <GraduationCap className="w-10 h-10 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Login</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentId" className="text-sm font-medium text-gray-700">Email </Label>
            <div className="relative">
              <Input
                id="studentId"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full"
                placeholder="Enter your email"
                required
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full"
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <Button 
            type="submit" 
            variant={"student"}
            className="w-full  text-lg text-white sm:text-base"
            onClick={handleSubmit}
            disabled={flag}
          >
            {flag?"Logging..":"Log In"}
          </Button>
        </div>

        {/* <div className="mt-6 text-center">
          <Link to="/student/changepassword/login" className="text-sm text-blue-600 hover:underline">Forgot password or Change Password?</Link>
        </div> */}
      </motion.div>
    </div>
  );
}