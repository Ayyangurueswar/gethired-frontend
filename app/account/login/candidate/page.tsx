'use client';
import Link from 'next/link'
import { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-1/3 flex flex-col h-3/5 justify-between'>
            <h1 className='text-center text-4xl font-bold'>Login</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='mb-2'>Email</label>
                  <input type='email' id='email' className='border border-slate-500 rounded-md px-4 py-2' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2'>Password</label>
                  <input type='password' id='password' className='border border-slate-500 rounded-md px-4 py-2' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            </form>
            <div className='w-full flex flex-col items-center gap-3'>
                <button className='bg-slate-700 text-white rounded-md px-4 py-2 w-1/3'>Login</button>
                <p className='text-sm'>Don&apos;t have an account? <Link href='/account/signup/candidate' className='underline text-blue-500'>Register</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Page