'use client';
import React, {useState} from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionValue, motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useNotifs } from '@/context/NotificationContext';
import Image from 'next/image';

const DashboardHeader = ({progress}: {
    progress: MotionValue<number>
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const {addNotification} = useNotifs()
  const handleLogout = (e: any) => {
    e.preventDefault();
    logout();
    router.push('/');
    addNotification({content: 'Logged out successfully', type: 'success'});
  }
  if(!user){
    return <p>Loading...</p>
  }
  return (
    <>
        <div className="w-full px-14 py-4 flex items-center justify-between fixed bg-white z-10">
            <h1 className="text-3xl">GetHired</h1>
            <div className='flex items-center w-1/3 justify-between'>
                {user.type === 'candidate' ? <Link href='/jobs/view'>View jobs</Link> : <Link href='/jobs/post'>Post a job</Link>}
                {user.type === 'candidate' ? <Link href='/applications/view'>View applications</Link> : <Link href='/applications/review'>Review applications</Link>}
                <div className='relative'>
                    {user.profilePicture ? <Image src={user.profilePicture.formats.thumbnail.url} alt='user' width={40} height={40} onClick={() => {setIsOpen(!isOpen)}} className='rounded-full'/> :<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" onClick={() => {setIsOpen(!isOpen)}} className='hover:cursor-pointer'>
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>} 
                    <AnimatePresence>
                        {
                            isOpen && (
                                <motion.div className='absolute top-12 -right-2 px-6 py-4 flex flex-col border rounded-md border-slate-600 overflow-hidden bg-white' initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -400, opacity: 0}}>
                                    <p className='font-semibold text-lg'>{user.username}</p>
                                    <p className='texxt-slate-500 text-sm'>{user.email}</p>
                                    <hr className='w-full h-0.5 bg-slate-400 my-2'/>
                                    <div className='flex flex-col gap-2'>
                                        <Link href={`/updateProfile/${user.type}`} className='hover:text-orange-500 transition-colors'>Update profile</Link>
                                        <hr className='w-full h-0.5 bg-slate-400'/>
                                        <Link href={`/account/dashboard/${user.type}`} className='hover:text-orange-500 transition-colors'>Go to dashboard</Link>
                                        <hr className='w-full h-0.5 bg-slate-400'/>
                                        <button onClick={handleLogout} className='text-left hover:text-orange-500 transition-colors'>Logout</button>
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
        <motion.div className='h-2 bg-slate-900 fixed top-0 left-0 right-0 z-10' style={{scaleX: progress, transformOrigin: '0%'}}></motion.div>
    </>
  )
}

export default DashboardHeader