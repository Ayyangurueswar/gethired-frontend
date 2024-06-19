'use client';
import React, {useState} from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionValue, motion, useCycle } from 'framer-motion'
import { MenuButton, Slider } from './DashboardSlider';

const Header = ({progress}: {
    progress: MotionValue<number>
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [show, setShow] = useCycle(false, true);
  return (
    <>
        <div className="w-full md:px-14 px-8 py-4 flex items-center justify-between fixed bg-white z-20">
            <h1 className="text-3xl">GetHired</h1>
            <div className="md:flex items-center gap-10 mx-auto hidden">
                <Link href='/'>Discover</Link>
                <Link href='/account/login/candidate'>For job seekers</Link>
                <Link href='/account/login/recruiter'>For companies</Link>
            </div>
            <div className="sm:flex items-center gap-4 hidden">
                <div className='relative'>
                    <button className="px-4 py-2 border border-slate-500 rounded-lg" onClick={() => {
                        if(signupOpen){
                            setSignupOpen(false);
                        }
                        setIsOpen(!isOpen);
                    }}>Login</button>
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
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg" onClick={() => {
                        if(isOpen){
                            setIsOpen(false);
                        }
                        setSignupOpen(!signupOpen)
                        }}>Sign up</button>
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
            <MenuButton isOpen={show} onClick={setShow} />
            <AnimatePresence>
                {show && <Slider />}
            </AnimatePresence>
        </div>
        <motion.div className='h-2 bg-slate-900 fixed top-0 left-0 right-0 z-20' style={{scaleX: progress, transformOrigin: '0%'}}></motion.div>
    </>
  )
}

export default Header