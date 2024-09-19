import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Trash2, UserPlus, LogOut } from 'lucide-react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useNavigate } from 'react-router-dom'

interface User {
  id: number
  name: string
  email: string
  contactno: string
  dob: string
  gender: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/admin/users`, {
      headers: {
        Authorization: localStorage.getItem("admintoken")
      }
    }).then((data) => {
      setUsers(data.data.users)
    }).catch((err: Error) => {
      console.log(err)
    })
  }, [])

  const handleDelete = (id: string) => {
    console.log(id)
    setDeleteUserId(id)
  }

  const confirmDelete = async() => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/deleteuser`, { email: deleteUserId }, {
        headers: {
          Authorization: localStorage.getItem("admintoken")
        }
      })
      console.log(res)
      setDeleteUserId(null)
      window.location.reload()
    } catch {
      alert("error")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admintoken")
    navigate("/") 
  }

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-purple-900">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-100">User List</h1>
          <div className="flex space-x-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => {
              navigate("/admin/createuser")
            }}>
              <UserPlus className="mr-2 h-4 w-4" /> Create User
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <Card key={user.id} className="w-full bg-white dark:bg-purple-800">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-100">{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-600 dark:text-blue-200">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact:</strong> {user.contactno}</p>
                <p><strong>Date of Birth:</strong> {user.dob}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
              </CardContent>
              <CardFooter>
                <Button variant="admin" onClick={() => handleDelete(user.email)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={deleteUserId !== null} onOpenChange={() => setDeleteUserId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setDeleteUserId(null)}>Cancel</Button>
              <Button variant="default" onClick={confirmDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}