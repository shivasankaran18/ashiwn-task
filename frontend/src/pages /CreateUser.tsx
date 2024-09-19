
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

interface UserFormData {
  name: string
  email: string
  password: string
  contactno: string
  dob: string
  gender: string
}

export  function CreateUser() {
    const navigate=useNavigate()
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    contactno: '',
    dob: '',
    gender: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleGenderChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      gender: value
    }))
  }

  const handleSubmit = async () => {
    console.log(formData)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/createuser`, formData, {
        headers: {
          Authorization: localStorage.getItem("admintoken")
        }
      })
      console.log(response.data)
      navigate("/admin/users")
      

    } catch (error) {
      
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-purple-800">
        <div >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800 dark:text-purple-100">Create User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactno">Contact Number</Label>
              <Input
                id="contactno"
                name="contactno"
                type="tel"
                value={formData.contactno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={handleGenderChange} value={formData.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant={"admin"} className='w-full' onClick={handleSubmit
            }>
              Create User
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}