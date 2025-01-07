import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';



export const useAuthStore = create((set)=>({
   authUser:null,
   isSigningUp:false,
   isLoggingIn:false,
   isUpdatingProfile:false,
   isCheckingAuth:true,
   checkAuth:async() =>{
    try {
        const response = await axiosInstance.get('/check-auth');
        set({authUser:response.data})
    } catch (error) {
        console.log("Error", error);
        set({authUser:null})
    }finally{
        set({isCheckingAuth:false})
    }
   },
   signUp:async(data)=>{
    set({isSigningUp:true})
    try{
        const response = await axiosInstance.post('/register', data);
        console.log(response)
        set({authUser:response.data})
        toast.success("Account created successfully")
    }catch(e){
        toast.error(e.message);
        console.log(e)
    }finally{
        set({isSigningUp:false})
    }
  
   },
   login:async(data)=>{
    set({isLoggingIn:true})
    try{
        const response = await axiosInstance.post('/login', data);
        console.log(response)
        set({authUser:response.data})
        toast.success("Logged In successfully")
    }catch(error){
        toast.error(error.response.data.message);
        console.log(error)
    }finally{
        set({isLoggingIn:false})
    }
  
   },
   logout:async()=>{
    try{
        await axiosInstance.post('/logout');
        set({authUser:null});
        toast.success("Logged out successfully")
    }catch(err){
        toast.error("An error occurred while logging out");
        console.log(err);

    }
   },
   updateProfile:async(data)=>{
    set({isUpdatingProfile:true})
    try {
        const response = await axiosInstance.put('/update-profile',data);
        set((state) => ({authUser: {...state.authUser, ...response.data}}));
        toast.success("Profile updated successfully")
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");

    }finally{
        set({isUpdatingProfile:false})
    }
   }
}))