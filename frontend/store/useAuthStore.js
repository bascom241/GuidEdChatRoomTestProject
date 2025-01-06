import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set)=>({
   authUser:null,
   isSigningUp:false,
   isLoggingIn:false,
   isUpdatingProfile:false,
   isCheckingAuth:true,
   checkAuth:async() =>{
    try {
        const response = await axiosInstance.get('/check-auth');
        set({authUser:response})
    } catch (error) {
        console.log("Error", error);
        set({authUser:null})
    }finally{
        set({isCheckingAuth:false})
    }
   }
}))