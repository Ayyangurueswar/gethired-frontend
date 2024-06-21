'use client';
import React, {useState} from 'react'
import { useScroll, motion } from 'framer-motion';
import DashboardHeader from '../others/DashboardHeader';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Footer from '../others/Footer';
import Modal from '../modals/Modal';
import UploadImage from '../modals/UploadImage';
import { useNotifs } from '@/context/NotificationContext';
import UpdatePassword from '../modals/UpdatePassword';
import LoadingSpinner from '../others/LoadingSpinner';

const UpdateProfileRecruiter = ({jwt}: {
    jwt: string,
}) => {
  const {user, updateDetails} = useAuth();
  const {scrollYProgress} = useScroll()
  const [show, setShow] = useState(false);
  const {addNotification} = useNotifs();
  const [updatePwd, setUpdatePwd] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(user && user.profilePicture ? user.profilePicture.formats.thumbnail.url : '/image1.png');
  const [userData, setUserData] = useState({
    username: user ? user.username : '',
    contact: user ? user.contact : "",
    location: user ? user.location : "",
    url: user ? user.url : "",
    about: user ? user.about : ""
  })
  const handleChange = (e: any) => {
    setUserData({
     ...userData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = () => {
      updateDetails({...userData});
      addNotification({content: 'Details updated', type: 'success'});
  }
  if(!user){
    return(
      <div className='w-full h-screen flex items-center justify-center'>
        <LoadingSpinner size={60}/>
      </div>
    )
  }
  return (
    <div className='w-full overflow-y-auto'>
        <DashboardHeader progress={scrollYProgress}/>
        <div className="mt-24 w-full px-14 flex flex-col gap-8 mb-5">
          <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-8">
            <div className="flex items-center gap-3 ">
              <label htmlFor="username" className="md:w-1/4">Username: </label>
              <input type="text" name="username" id="username" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={userData.username} onChange={handleChange}/>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Image src={imagePreview} alt='user' width={100} height={100} className='rounded-full'/>
                <button className="bg-slate-950 text-while px-6 py-2 text-white rounded-md" onClick={() => setShow(true)}>Update profile picture</button>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="contact" className="w-1/4">Contact: </label>
              <input type="tel" name="contact" id="contact" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={userData.contact} onChange={handleChange}/>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="location" className="w-1/4">Location: </label>
              <input name="location" id="location" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={userData.location} onChange={handleChange}/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="about">About:</label>
            <textarea id='about' name='about' rows={10}  className='border border-slate-700 rounded-md px-4 py-2 outline-none resize-none' value={userData.about} onChange={handleChange}/>
          </div>
          <div className="flex items-center gap-3 md:w-1/3 w-full">
            <label htmlFor="url">URL:</label>
            <input name="url" id="url" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={userData.url} onChange={handleChange}/>
          </div>
          <div className='md:w-1/3 sm:max-md:w-1/2 flex items-center justify-between sm:mx-auto'>
            <motion.button className="bg-slate-950 text-while md:px-6 px-2 py-2 text-white rounded-md" onClick={handleSubmit} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>Update</motion.button>
            <motion.button className="md:px-6 px-2 py-2 bg-slate-950 text-white rounded-md" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => setUpdatePwd(true)}>Update password</motion.button>
          </div>
        </div>
        <Modal show={show} onClose={() => setShow(false)}>
            <UploadImage jwt={jwt} setImagePreview={setImagePreview} userId={Number(user.id)} imageUploaded={() => {setShow(false)}}/>
        </Modal>
        <Modal show={updatePwd} onClose={() => setUpdatePwd(false)}>
          <UpdatePassword jwt={jwt} closeModal={() => {setUpdatePwd(false)}}/>
        </Modal>
        <Footer />
    </div>
  )
}

export default UpdateProfileRecruiter