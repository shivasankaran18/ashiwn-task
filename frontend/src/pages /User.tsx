'use client'

import { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from 'lucide-react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

interface UserDetails {
  name: string
  email: string
  contactno: string
  gender: string
  dob: string
}

export  function UserDetail() {
  const [user, setUser] = useState<UserDetails | null>(null)
  const router = useNavigate()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user/details`, {
          headers: {
            Authorization: localStorage.getItem("studenttoken")
          }
        })
        setUser(response.data.user)
      } catch (error) {
        console.error('Error fetching user details:', error)

      }
    }

    fetchUserDetails()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("usertoken")
    router('/') 
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-purple-900 dark:to-blue-900 p-4">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700 dark:text-purple-300">
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Number</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.contactno}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.gender}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.dob}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}