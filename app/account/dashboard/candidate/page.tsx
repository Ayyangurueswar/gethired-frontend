'use client';
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardHeader from '@/components/others/DashboardHeader';
import { useScroll, motion } from 'framer-motion';
import Image from 'next/image';
import LatestJobs from '@/components/others/LatestJobs';
import Link from 'next/link';
import Footer from '@/components/others/Footer';

const Page = () => {
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
    <div className='w-full overflow-x-hidden'>
        <DashboardHeader progress={scrollYProgress}/>
        <div className='w-full flex flex-col items-center justify-center gap-20 h-screen'>
          <div className='flex flex-col gap-3 items-center'>
            <motion.div style={{ overflow: "hidden", display: "flex", fontSize: "2rem", fontWeight: "bold" }}
              variants={container} initial="hidden" animate="visible">
              {content.map((word, index) => (
                <motion.span variants={child} style={{ marginRight: "5px" }} key={index}>
                  {word}
                </motion.span>
              ))}
            </motion.div>
            <motion.p className='text-lg text-slate-700' initial="offscreen" whileInView="onscreen" variants={scrollVariants} viewport={{once: true}}>Let&apos;s find the right job for you</motion.p>
          </div>
          <LatestJobs />
        </div>
        <div className='w-full md:h-screen px-14 grid md:grid-cols-2 grid-cols-1 h-full mb-5'>
            <Image src='/image1.png' className='w-full h-full md:block hidden' alt='' width={600} height={600}/>
            <div className='flex flex-col justify-between h-5/6'>
              <h1 className='font-bold text-4xl'>Find work that works for you</h1>
              <div className='flex flex-col gap-8'>
                <p className='text-2xl'>A personalized and private job search, with all the info you care about, all upfront</p>
                <div className="flex flex-col text-sm gap-8 justify-between">
                  <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                    <div className="bg-orange-200 sm:w-1/12 w-1/4 p-2 rounded-full">
                      <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e670c0dd6f22eee061_tap.svg' alt="" width={30} height={30} className="m-auto"/>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-xl font-semibold'>Stay in the know</p>
                      <p>No guessing games. View salary and stock options before you apply.</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                    <div className="bg-orange-200 sm:w-1/12 w-1/4 p-2 rounded-full">
                      <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646d75631aaeadb21e18efc6_settings.svg' alt="" width={30} height={30} className="m-auto"/>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-xl font-semibold'>Personalized search</p>
                      <p>Personalized filters make it quick and easy to find the jobs you care about</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                    <div className="bg-orange-200 sm:w-1/12 w-1/4 p-2 rounded-full">
                      <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/647d04daca07a115af9c05ce_send.svg' alt="" width={30} height={30} className="m-auto"/>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-xl font-semibold'>Unique teams, exciting roles</p>
                      <p>Discover unique jobs with future-defining teams</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className='flex items-center sm:gap-8 md:mt-0 mt-6 w-full justify-between'>
                <Link href='/jobs/view' className='sm:px-6 text-center w-2/5 py-2 bg-slate-900 rounded-md text-white'>Browse jobs</Link>
                <Link href='/applications/view' className='w-1/2'>View your applications</Link>
              </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Page