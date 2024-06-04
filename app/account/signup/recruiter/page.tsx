'use client';
import Link from 'next/link'
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {register} = useAuth();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(password!== confirmPassword){
      alert('Passwords do not match');
      return;
    }
    register({username: name, email, password, type: 'recruiter'});
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-1/3 flex flex-col h-5/6 justify-between'>
            <h1 className='text-center text-4xl font-bold'>Signup</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <label htmlFor='name' className='mb-2'>Company name</label>
                  <input id='name' className='border border-slate-500 rounded-md px-4 py-2' value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='mb-2'>Email</label>
                  <input type='email' id='email' className='border border-slate-500 rounded-md px-4 py-2' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2'>Password</label>
                  <input type='password' id='password' className='border border-slate-500 rounded-md px-4 py-2' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='confirmPwd' className='mb-2'>Confirm Password</label>
                  <input type='password' id='confirmPwd' className='border border-slate-500 rounded-md px-4 py-2' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>
            </form>
            <div className='w-full flex flex-col items-center gap-3'>
                <button className='bg-slate-700 text-white rounded-md px-4 py-2 w-1/3' onClick={handleSubmit}>Signup</button>
                <p className='text-sm'>Already have an account? <Link href='/account/login/recruiter' className='underline text-blue-500'>Sign in</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Page