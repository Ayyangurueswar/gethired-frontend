'use client';
import React, { useEffect, useState } from 'react'
import { useScroll, motion } from 'framer-motion';
import DashboardHeader from '@/components/others/DashboardHeader';
import { API_URL } from '@/config';
import Footer from '../others/Footer';
import CandidateApplication from './CandidateApplication';
import { Job, User } from '@/constants/types';

interface Application {
  id: string;
  name: string;
  skills?: string;
  contact: string;
  location: string;
  canStartFrom: string;
  experience?: string;
  job: Job;
  resume?: any;
  user: User;
  cover: string;
  status: string;
  applicationFor: number
  createdAt?: string
  updatedAt?: string;
}

const ReviewApplications = ({jobId, jwt}: {
    jobId: string,
    jwt: string,
}) => {
  const { scrollYProgress } = useScroll();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [shortlisted, setShortlisted] = useState<boolean>(false);
  const [shortlistedApplications, setShortlistedApplications] = useState<Application[]>([]);
  const toggleMode = () => {
    setShortlisted(!shortlisted);
  }
  useEffect(() => {
    fetch(`${API_URL}/api/applications/getApplications`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          jobId: jobId
        })
    }).then((res) => res.json()).then((data) => {
      setFilteredApplications(data.filter((app: Application) => app.status !== 'Rejected'));
      setApplications(data);
      setShortlistedApplications(data.filter((app: Application) => app.status === 'Shortlisted'));
    })
  }, []);
  const handleChange = (e: any) => {
    if(shortlisted){
      if(e.target.name === 'startDate'){
        const filtered = applications.filter((app) => (app.status === 'Shortlisted') && (new Date(app.canStartFrom).getTime() <= new Date(e.target.value).getTime()));
        setFilteredApplications(filtered);
        return;
      }
      setShortlistedApplications(applications.filter((app) => (app.status === 'Shortlisted') && app[e.target.name].toLowerCase().includes(e.target.value.toLowerCase())));
    }
    else{
      if(e.target.name ==='startDate'){
        const filtered = applications.filter((app) => (app.status !== 'Shortlisted') && (new Date(app.canStartFrom).getTime() <= new Date(e.target.value).getTime()));
        setFilteredApplications(filtered);
        return;
      }
      setFilteredApplications(applications.filter((app) => (app.status !== 'Shortlisted') && app[e.target.name].toLowerCase().includes(e.target.value.toLowerCase())));
    }
  }
  return (
    <div className='w-full overflow-y-auto min-h-screen'>
        <DashboardHeader progress={scrollYProgress}/>
        {applications.length === 0 ? (
          <p className='text-2xl font-semibold mt-20'>No applications yet.</p>
        ) : (
          <>
            <div className='px-20 mt-20 w-1/3'>
              <div className='w-full flex items-center justify-between relative'>
                <button className={`${!shortlisted ?  'text-white z-10' : 'bg-slate-200'} rounded-lg py-1 w-2/5`} onClick={toggleMode}>All ({filteredApplications.length})</button>
                <button className={`${shortlisted ? 'text-white z-10' : 'bg-slate-200'} rounded-lg py-1 w-1/2`} onClick={toggleMode}>Shortlisted ({shortlistedApplications.length})</button>
                <motion.div className={`${shortlisted ? 'right-0 w-1/2' : 'left-0 w-2/5'} rounded-lg h-full bg-slate-900 absolute`} layout transition={{duration: 0.3}}></motion.div>
              </div>
            </div>
            <form className="w-full px-20 mb-10">
              <div className="w-full flex items-end justify-between">
                  <input name="name" placeholder="Search by name" className="px-4 py-2 rounded-md border border-slate-700 w-1/3 outline-none" onChange={handleChange}/>
                  <input name='skills' placeholder='Search by skills' className="px-4 py-2 rounded-md border border-slate-700 w-1/3 outline-none" onChange={handleChange}/>
                  <div className='w-1/6 flex flex-col gap-1'>
                    <label htmlFor='startDate'>Can start from:</label>
                    <input name='startDate' id='startDate' type='date' className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={handleChange}/>
                  </div>
              </div>
            </form>
            <div className='w-full px-20 grid grid-cols-3 gap-14 mb-10'>
              {(shortlisted && shortlistedApplications.length === 0) ? <p className='text-xl font-semibold'>No shortlisted applications yet</p>
              : (shortlisted ? shortlistedApplications : filteredApplications).map((application) => (
                  <CandidateApplication application={application} jwt={jwt} key={application.id} shortlisted={application.status === 'Shortlisted'}/>
              ))}
            </div>
          </>
        )}
      <Footer />
    </div>
  )
}

export default ReviewApplications