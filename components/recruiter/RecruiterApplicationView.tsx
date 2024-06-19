'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion';
import Modal from '../modals/Modal';
import { API_URL } from '@/config';
import { useNotifs } from '@/context/NotificationContext';

const RecruiterApplicationView = ({job, jwt}: {
    job: any,
    jwt: string
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {addNotification} = useNotifs();
  const handleCloseOpening = async () => {
    setLoading(true)
    const res = await fetch(`${API_URL}/api/jobs/${job.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
    const data = await res.json();
    setLoading(false);
    if(res.ok){
        addNotification({content: 'Job deleted successfully', type: 'success'});
        setShow(false);
        location.reload();
    }
    else{
        addNotification({content: data.error.message, type: 'error'});
    }
  }
  return (
        <div key={job.id} className="w-full md:flex-row flex-col flex md:items-center md:justify-between gap-6 md:px-10 md:py-8 px-5 py-4 shadow-md rounded-md shadow-slate-600 hover:scale-105 transition border border-slate-700">
            <h3 className="text-2xl font-semibold md:w-1/4 w-full whitespace-nowrap text-ellipsis overflow-hidden">{job.title}</h3>
            <div className="md:w-1/3 w-full flex items-center justify-between">
                <p className="text-gray-500 w-3/4 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{job.location}</p></p>
                <p className="text-gray-500 w-1/2"><Image src='/icons8-receive-cash-50.png' className="inline-block mr-2" alt="" width={20} height={20}/>&#8377; {job.stipend}</p>
            </div>
            <div className='md:w-1/3 w-full flex items-center justify-between text-sm'>
                <motion.button className='bg-red-600 text-white md:px-4 px-2 py-2 rounded-md w-2/5' whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} onClick={() => setShow(true)}>Close this opening</motion.button>
                <Link href={`/applications/review/${job.id}`}>Review applications</Link>
            </div>
            <Modal show={show} onClose={() => setShow(false)}>
            <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
                <p>Are you sure, do you want to close this opening - {job.title}</p>
                <div className="flex items-center gap-6">
                    <button onClick={handleCloseOpening}>Yes</button>
                    <motion.button className="px-6 py-2 bg-slate-900 text-white rounded-md" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => setShow(false)}>No</motion.button>
                </div>
                {loading && <p>Loading...</p>}
            </div>
            </Modal>
        </div>
    )
}

export default RecruiterApplicationView