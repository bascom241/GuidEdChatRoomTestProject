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
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from "../store/useThemeStore"
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUp />: <Navigate to="/"/>} />
        <Route path="/login" element={ !authUser ? <Login />: <Navigate to="/"/>} />
        <Route path='profile' element={authUser? <Profile />: <Navigate to="/login"/>} />
        <Route path='settings' element={<Setting />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  )
}

export default App
