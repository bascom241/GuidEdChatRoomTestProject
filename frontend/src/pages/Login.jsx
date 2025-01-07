import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare,User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthImagePattern from '../components/AuthImagePattern';

const Login = () => {

  
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  
  });

  const validateUser = () => {

    if(!formData.email) return toast.error("Email is required");
    if(!formData.password) return toast.error("Password is required");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format")


    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateUser();

    if(success === true){
      login(formData);
    }
  }
  return(
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-x-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-3xl font-bold'>Login </h1>
              <p className='text-gray-600'>Create an account to get started</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
       
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Mail className='size-5 text-base-content/40'/>
                </div>
                <input
                  type='email'
                  placeholder='Enter your Email'
                  className={`input input-bordered w-full pl-10`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

       
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Lock className='size-5 text-base-content/40'/>
                </div>
                <input
                  type={showPassword ? "text":"password"}
                  placeholder='********'
                  className={`input input-bordered w-full pl-10`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                type='button'
                className='absolute inset-y-0 right-0 flex items-center pr-3'
                onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword ? (
                      <EyeOff className='size-5 text-base-content/40'/>
                    ):(
                      <Eye className='size-5 text-base-content/40'/>
                    )
                  }
                </button>
              </div>

       
            </div>
            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
                  {isLoggingIn ?(
                    <>
                    <Loader2 className='size-5 animate-spin'/>
                    Loading...
                    </>
                  ):(
                    "Login"
                  )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>Dont have an account?{" "}
            <Link to='/signup' className='link link-primary'>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        tittle="Join Our Community"
        subtittle=" GuidED, Learn Anytime Anywhere AnyDay"
      />
    </div>
  )
}

export default Login
