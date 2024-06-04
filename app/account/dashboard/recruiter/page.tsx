'use client';
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardHeader from '@/components/DashboardHeader';
import { useScroll, motion } from 'framer-motion';
import Image from 'next/image';

const Page = () => {
  const { user } = useAuth();
  const {scrollYProgress} = useScroll();
  const content = ["Hello,", user.username, <Image key={9} src='/waving-hand-svgrepo-com (2).png' alt='' width={50} height={50}/>]
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
        <div className='w-full flex flex-col items-center justify-center h-screen'>
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
          
        </div>
    </div>
  )
}

export default Page