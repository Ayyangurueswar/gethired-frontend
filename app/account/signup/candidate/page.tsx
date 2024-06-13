'use client';
import Link from 'next/link'
import { useState } from 'react';
import { useNotifs } from '@/context/NotificationContext';
import UpdateProfile from '@/components/UpdateProfile';
import { AnimatePresence, motion } from 'framer-motion';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [detailsFilled, setDetailsFilled] = useState(true);
  const {addNotification} = useNotifs();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(name === '' || email === '' || password === '' || confirmPassword === ''){
      addNotification({content: 'Please fill all the details', type: 'error'});
      return;
    }
    if(password!== confirmPassword){
      addNotification({content: 'Passwords do not match', type: 'error'});
      return;
    }
    setDetailsFilled(false);
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-1/3 h-5/6'>
      <div className='flex items-center gap-2 w-full py-4'>
        <motion.div className='h-1 rounded-full bg-slate-800' initial={{width:0}} animate={{width: '50%'}}></motion.div>
        <AnimatePresence>
        {!detailsFilled && (
          <motion.div className='h-1 rounded-full bg-slate-800' initial={{width:0}} animate={{width: '50%'}} exit={{width: 0}}></motion.div>
        )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode='wait'>
        {
        detailsFilled ? (
          <motion.div className='flex flex-col justify-between w-full h-full' initial={{x: 200, opacity:0}} animate={{x: 0, opacity: 1}} exit={{x: -100, opacity: 0}}>
            <h1 className='text-center text-4xl font-bold'>Signup</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <label htmlFor='name' className='mb-2'>Name</label>
                  <input id='name' className='border border-slate-500 rounded-md px-4 py-2 outline-none' value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='mb-2'>Email</label>
                  <input type='email' id='email' className='border border-slate-500 rounded-md px-4 py-2 outline-none' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2'>Password</label>
                  <input type='password' id='password' className='border border-slate-500 rounded-md px-4 py-2 outline-none' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='confirmPwd' className='mb-2'>Confirm Password</label>
                  <input type='password' id='confirmPwd' className='border border-slate-500 rounded-md px-4 py-2 outline-none' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>
            </form>
            <div className='w-full flex flex-col items-center gap-3'>
                <button className='bg-slate-700 text-white rounded-md px-4 py-2 w-1/3' onClick={handleSubmit}>Next</button>
                <p className='text-sm'>Already have an account? <Link href='/account/login/candidate' className='underline text-blue-500'>Sign in</Link></p>
            </div>
          </motion.div>
        ) : (
          <UpdateProfile username={name} email={email} password={password} toggleDetails={setDetailsFilled}/>
        )
        }
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Page