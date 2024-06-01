import React from 'react'
import Link from 'next/link'
import { MotionValue, motion } from 'framer-motion'

const Header = ({progress}: {
    progress: MotionValue<number>
}) => {
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
                <Link href='/' className="px-4 py-2 border border-slate-500 rounded-lg">Login</Link>
                <Link href='/' className="px-4 py-2 bg-slate-800 text-white rounded-lg">Sign up</Link>
            </div>
        </div>
        <motion.div className='h-2 bg-slate-900 fixed top-0 left-0 right-0 z-10' style={{scaleX: progress, transformOrigin: '0%'}}></motion.div>
    </>
  )
}

export default Header