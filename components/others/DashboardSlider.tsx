import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
);

export const MenuButton = ({onClick, isOpen}: {
    onClick: () => void,
    isOpen: boolean,
}) => {
    return (
        <motion.button
        className="flex items-center justify-center text-black w-12 h-12 sm:hidden"
        onClick={onClick}
        animate={isOpen ? "open" : "closed"}
        initial={false}
        >
            <svg
                width="23"
                height="23"
                style={{ margin: "4px 0 0 2px" }}
                viewBox="0 0 23 23"
            >
                <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
                />
                <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
                />
                <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
                />
            </svg>
        </motion.button>
    )
}

export const DashboardSlider = ({logout}: {
  logout: () => void,
}) => {
  const itemVariants = {
    closed: {
      opacity: 0
    },
    open: { opacity: 1 }
  };
  
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };
  const {user} = useAuth();
  return (
    <motion.aside initial={{width: 0}} animate={{width: 300}}
    exit={{width: 0, transition: {delay: 0.7, duration: 0.3}}} className='bg-slate-800 text-white h-screen fixed top-0 left-0 z-10'>
      <motion.div className='mt-20 px-6 py-4' initial="closed" animate="open" exit="closed" variants={sideVariants}>
        <motion.div variants={itemVariants} className='flex items-center gap-4 py-4 border-b border-white'>
          <Image src={user?.profilePicture?.formats.thumbnail.url || '/image1.png'} alt='user' width={40} height={40} className='rounded-full w-16 h-16'/>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>{user?.username}</p>
            <p className='text-xs'>{user?.email}</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className='py-4 border-b border-white'>
          <Link href={`/updateProfile/${user?.type}`}>Update profile</Link>
        </motion.div>
        <motion.div variants={itemVariants} className='py-4 border-b border-white'>
          <Link href={`/account/dashboard/${user?.type}`}>Go to dashboard</Link>
        </motion.div>
        {
          user?.type === 'candidate' && (
            <>
              <motion.div variants={itemVariants} className='py-4 border-b border-white'>
                <Link href={`/jobs/view`}>View jobs</Link>
              </motion.div>
              <motion.div variants={itemVariants} className='py-4 border-b border-white'>
                <Link href={`/applications/view`}>View applications</Link>
              </motion.div>
            </>
          )
        }
        {
          user?.type === 'recruiter' && (
            <>
              <motion.div variants={itemVariants} className='py-4 border-b border-white'>
                <Link href={`/jobs/post`}>Post a job</Link>
              </motion.div>
              <motion.div variants={itemVariants} className='py-4 border-b border-white'>
                <Link href={`/applications/review`}>View applications</Link>
              </motion.div>
            </>
          )
        }
        <motion.div variants={itemVariants} className='py-4 border-b border-white'>
          <button onClick={logout}>Logout</button>
        </motion.div>
      </motion.div>
    </motion.aside>
  )
}

export const Slider = () => {
  const itemVariants = {
    closed: {
      opacity: 0
    },
    open: { opacity: 1 }
  };
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1
      }
    }
  };
  const listVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <motion.aside initial={{width: 0}} animate={{width: 300}}
    exit={{width: 0, transition: {delay: 0.7, duration: 0.3}}} className='bg-slate-800 text-white h-screen fixed top-20 left-0 z-10'>
      <motion.div className='px-6 py-4 flex gap-4 flex-col w-full' initial="closed" animate="open" exit="closed" variants={sideVariants}>
        <motion.div variants={itemVariants} className='w-4/5'>
          <motion.button onClick={() => {setLoginOpen(!loginOpen)}} className='w-full flex items-center justify-between px-6 py-2'>
            <span className='text-xl'>Login</span>
            <motion.span
            animate={{ rotate: loginOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className='inline-block'
          >
            ▼
          </motion.span>
          </motion.button>
          <AnimatePresence>
            {
              loginOpen && (
                <motion.ul initial="closed"
                animate="open"
                exit="closed"
                variants={listVariants}
                className='mt-2 p-0 list-none space-y-4 ml-10'>
                  <motion.li variants={{closed: {opacity: 0, y: -20}, open: {opacity: 1, y: 0}}}>
                    <Link href='/account/login/candidate'>Candidate</Link>
                  </motion.li>
                  <motion.li variants={{closed: {opacity: 0, y: -20}, open: {opacity: 1, y: 0}}}>
                    <Link href='/account/login/recruiter'>Recruiter</Link>
                  </motion.li>
                </motion.ul>
              )
            }
          </AnimatePresence>
        </motion.div>
        <motion.div variants={itemVariants} className='w-4/5'>
          <motion.button onClick={() => {setRegisterOpen(!registerOpen)}} className='w-full flex items-center justify-between px-6 py-2'>
            <span className='text-xl'>Register</span>
            <motion.span
            animate={{ rotate: registerOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className='inline-block'
          >
            ▼
          </motion.span>
          </motion.button>
          <AnimatePresence>
            {
              registerOpen && (
                <motion.ul initial="closed"
                animate="open"
                exit="closed"
                variants={listVariants}
                className='mt-2 p-0 list-none space-y-4 ml-10'>
                  <motion.li variants={{closed: {opacity: 0, y: -20}, open: {opacity: 1, y: 0}}}>
                    <Link href='/account/signup/candidate'>Candidate</Link>
                  </motion.li>
                  <motion.li variants={{closed: {opacity: 0, y: -20}, open: {opacity: 1, y: 0}}}>
                    <Link href='/account/signup/recruiter'>Recruiter</Link>
                  </motion.li>
                </motion.ul>
              )
            }
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.aside>
  )
}