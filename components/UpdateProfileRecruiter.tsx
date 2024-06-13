'use client';
import React, {useState} from 'react'
import { useScroll } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Descendant } from 'slate';
import Image from 'next/image';
import TextEditor from './TextEditor';
import Footer from './Footer';
import Modal from './Modal';
import UploadImage from './UploadImage';

const UpdateProfileRecruiter = ({jwt}: {
    jwt: string,
}) => {
  const {user, updateDetails} = useAuth();
  const {scrollYProgress} = useScroll()
  const [about, setAbout] = useState<Descendant[]>(user.about)
  const [show, setShow] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(user.profilePicture ? user.profilePicture.formats.thumbnail.url : '/image1.png');
  const [userData, setUserData] = useState({
    username: user.username,
    contact: user.contact ? user.contact : "",
    location: user.location ? user.location : "",
    url: user.url ? user.url : "",
  })
  const handleChange = (e: any) => {
    setUserData({
     ...userData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = () => {
      updateDetails({...userData, about: about})
  }
  return (
    <div className='w-full overflow-y-auto'>
        <DashboardHeader progress={scrollYProgress}/>
        <div className="mt-24 w-full px-14 flex flex-col gap-8 mb-5">
          <div className="w-full grid grid-cols-2 gap-8">
            <div className="flex items-center gap-3 ">
              <label htmlFor="username" className="w-1/4">Username: </label>
              <input type="text" name="username" id="username" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={user.username} onChange={handleChange}/>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Image src={imagePreview} alt='user' width={100} height={100} className='rounded-full'/>
                <button className="bg-slate-950 text-while px-6 py-2 text-white rounded-md" onClick={() => setShow(true)}>Update profile picture</button>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="contact" className="w-1/4">Contact: </label>
              <input type="tel" name="contact" id="contact" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={user.contact} onChange={handleChange}/>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="location" className="w-1/4">Location: </label>
              <input name="location" id="location" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={user.location} onChange={handleChange}/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="about">About:</label>
            <TextEditor setDescription={setAbout} value={user.about}/>
          </div>
          <div className="flex items-center gap-3 w-1/3">
            <label htmlFor="url">URL:</label>
            <input name="url" id="url" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={user.url} onChange={handleChange}/>
          </div>
          <div className='w-1/3 flex items-center justify-between mx-auto'>
            <button className="bg-slate-950 text-while px-6 py-2 text-white rounded-md" onClick={handleSubmit}>Update</button>
            <Link href='/account/update' className="px-6 py-2 bg-slate-950 text-white rounded-md">Update password</Link>
          </div>
        </div>
        <Modal show={show} onClose={() => setShow(false)}>
            <UploadImage jwt={jwt} setImagePreview={setImagePreview} userId={user.id} imageUploaded={() => {setShow(false)}}/>
        </Modal>
        <Footer />
    </div>
  )
}

export default UpdateProfileRecruiter