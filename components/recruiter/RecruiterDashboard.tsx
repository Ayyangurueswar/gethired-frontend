'use client';
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardHeader from '@/components/others/DashboardHeader';
import { useScroll, motion } from 'framer-motion';
import Image from 'next/image';
import LatestJobs from '@/components/others/LatestJobs';
import Footer from '../others/Footer';
import Link from 'next/link';

const ReceuiterDashboard = ({jwt}: {
  jwt: string
}) => {
  const { user } = useAuth();
  const {scrollYProgress} = useScroll();
  const content = ["Hello,", user ? user.username : '', <Image key={9} src='/waving-hand-svgrepo-com (2).png' alt='' width={50} height={50}/>]
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  const scrollVariants  = {
    offscreen: {
      opacity: 0,
      y: -30,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }
  return (
    <div className='w-full'>
        <DashboardHeader progress={scrollYProgress}/>
        <div className='w-full flex flex-col items-center justify-center h-screen gap-20'>
          <div className='flex flex-col gap-3 items-center'>
            <motion.div style={{ overflow: "hidden", display: "flex", fontSize: "2rem", fontWeight: "bold" }}
              variants={container} initial="hidden" animate="visible">
              {content.map((word, index) => (
                <motion.span variants={child} style={{ marginRight: "5px" }} key={index}>
                  {word}
                </motion.span>
              ))}
            </motion.div>
            <motion.p className='text-lg text-slate-700' initial="offscreen" whileInView="onscreen" variants={scrollVariants} viewport={{once: true}}>Let&apos;s find the right candidates for you</motion.p>
          </div>
          <LatestJobs posted jwt={jwt}/>
        </div>
        <div className='w-full h-screen flex flex-col items-center justify-between py-10 px-14'>
              <p className='font-bold text-8xl text-center'>You have a job. We have job seekers.</p>
              <div className='text-2xl'>
                <p className='text-center'>Millions of startup-ready candidates, uniquely specific filters for finding niche talent, and all the tools you need to hire.</p>
                <p className='text-center'>Sign up now & have everything set up in 10 minutes, for free.</p>
              </div>
              <Link href='/jobs/post' className='bg-slate-900 text-white rounded-md px-6 py-2 text-xl'>Post a job now</Link>
        </div>
        <Footer />
    </div>
  )
}

export default ReceuiterDashboard