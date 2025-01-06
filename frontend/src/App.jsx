import { Button } from "react-daisyui"
import NavBar from "./components/NavBar"
import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import HomePage from './pages/Home'
import Setting from './pages/Setting'
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import {Loader} from 'lucide-react'
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login"/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='profile' element={authUser? <Profile />: <Navigate to="/login"/>} />
        <Route path='settings' element={<Setting />} />
      </Routes>

    </div>
  )
}

export default App
