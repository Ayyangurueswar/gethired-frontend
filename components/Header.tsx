'use client';
import React, {useState} from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionValue, motion } from 'framer-motion'

const Header = ({progress}: {
    progress: MotionValue<number>
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <>
        <div className="w-full px-14 py-4 flex items-center justify-between fixed bg-white z-10">
            <h1 className="text-3xl">GetHired</h1>
            <div className="flex items-center gap-10 mx-auto">
                <Link href='/'>Discover</Link>
                <Link href='/'>For job seekers</Link>
                <Link href='/'>For companies</Link>
            </div>
            <div className="flex items-center gap-4">
                <div className='relative'>
                    <button className="px-4 py-2 border border-slate-500 rounded-lg" onClick={() => {setIsOpen(!isOpen)}}>Login</button>
                    <AnimatePresence>
                        {
                            isOpen && (
                                <motion.div className='absolute top-12 flex flex-col w-32 border rounded-md border-slate-600 overflow-hidden' initial={{y: -100}} animate={{y: 0}} exit={{y: -200}}>
                                    <Link href='/account/login/candidate' className='w-full text-center border-b border-slate-500 p-2 hover:bg-blue-500 hover:text-white transition-colors'>Job seeker</Link>
                                    <Link href='/account/login/recruiter' className='w-full text-center hover:bg-blue-500 hover:text-white transition-colors p-2'>Job poster</Link>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                <div className='relative'>
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg" onClick={() => {setSignupOpen(!signupOpen)}}>Sign up</button>
                    <AnimatePresence>
                        {
                            signupOpen && (
                                <motion.div className='absolute top-12 flex flex-col w-32 border rounded-md border-slate-600 overflow-hidden' initial={{y: -100}} animate={{y: 0}} exit={{y: -200}}>
                                    <Link href='/account/signup/candidate' className='w-full text-center border-b border-slate-500 p-2 hover:bg-blue-500 hover:text-white transition-colors'>Job seeker</Link>
                                    <Link href='/account/signup/recruiter' className='w-full text-center hover:bg-blue-500 hover:text-white transition-colors p-2'>Job poster</Link>
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

export default Header