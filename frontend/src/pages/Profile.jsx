import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import Avatar from '../assets/Avartar.png'
import { Camera, Mail, User } from 'lucide-react';

const Profile = () => {
  const { isUpdatingProfile, authUser, updateProfile } = useAuthStore();
  const [selectedProfile, setSelectedProfile] = useState(authUser?.data?.profile || Avatar);

  // Handle the image change and update the profile
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Prepare FormData to send the file
    const formData = new FormData();
    formData.append('profile', file);

    // Call your API to upload the image
    const response = await updateProfile(formData);
    
    // Update selectedProfile with the new profile URL if the upload was successful
    if (response?.success) {
      setSelectedProfile(response?.updatedUser?.profile || Avatar);
    }
  };

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your Profile Information</p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img src={selectedProfile || Avatar} className='size-32 rounded-full object-cover border-4' />
              <label
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className='size-5 text-base-200' />
                <input
                  type='file'
                  id="avatar-upload"
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageChange}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading...." : "Click the camera icon to upload"}
            </p>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='size-4' />
                Username
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                {authUser?.data?.userName || authUser?.updatedUser?.userName || "Username not available"}
              </p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' />
                email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                {authUser?.data?.email || authUser?.updatedUser?.email || "Email not available"}
              </p>
            </div>

            <div className='mt-6 bg-base-300 rounded-xl p-6'>
              <h2 className='text-lg font-medium mb-4'>Account Information</h2>
              <div className='space-y-3 text-sm'>
                <div className=' flex items-center justify-between py-2 border-b border-zinc-700'>
                  <span>Member Since</span>
                  <span>{(authUser?.data?.lastLogin || authUser?.updatedUser?.lastLogin)?.split("T")[0]}</span>
                </div>
                <div className='flex items-center justify-between py-2'>
                  <span>Account Status</span>
                  <span className='text-green-500'>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
