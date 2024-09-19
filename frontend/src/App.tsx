import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./pages /Landing"
import { AdminLogin } from "./pages /Adminlogin"
import { UserList } from "./pages /Users"
import { CreateUser } from "./pages /CreateUser"
import { UserLogin } from "./pages /UserLogin"
import { UserDetail } from "./pages /User"


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/admin/users" element={<UserList />}></Route>
          <Route path="/admin/createuser" element={<CreateUser />}></Route>
          <Route path="/user/login" element={<UserLogin />}></Route>
          <Route path="/user/detail" element={<UserDetail />}></Route>


        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
