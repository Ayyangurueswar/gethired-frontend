'use client';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../others/DashboardHeader';
import { API_URL } from '@/config';
import Footer from '../others/Footer';
import RecruiterApplicationView from './RecruiterApplicationView';

const JobApplications = ({jwt}: {
    jwt: string,
}) => {
  const {scrollYProgress} = useScroll();
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}/api/jobs/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).then((res) => res.json()).then((data) => {
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);
    });
  }, [])
  const getText = (s: string) => {
    switch (s) {
        case '0,5000':
            return 'Less than 5000';
        case '5000,10000':
            return '5000 - 10000';
        case '10000,20000':
            return '10000 - 20000';
        case '20000,':
            return 'More than 20000';
        default:
            return 'All';
    }
  }
  const locations = jobs?.map((job) => job.location);
  const locationSet : string[] = [];
  new Set(locations).forEach((location) => {locationSet.push(location)});
  const handleChange = (e: any) => {
    setFilteredJobs(jobs.filter((job) => job[e.target.name].toLowerCase().includes(e.target.value.toLowerCase())))
  }
  const searchByStipend = (low: number, high: number) => {
    const filtered = jobs.filter((job) => job.stipend >= low && job.stipend < high);
    setFilteredJobs(filtered);
  }
  const searchByDate = (date: string) => {
    const filtered = jobs.filter((job) => {
      const applyDate = new Date(job.applyBy).getTime();
      const searchDate = new Date(date).getTime();
      return applyDate <= searchDate;
    });
    setFilteredJobs(filtered);
  }
  if(loading){
    return (
      <p className='font-bold text-3xl'>Loading...</p>
    )
  }
  return (
    <div className='w-full overflow-y-auto'>
      <DashboardHeader progress={scrollYProgress}/>
      <form className="w-full px-14 mt-24 hidden md:block">
        <div className="w-full flex items-end justify-between">
            <input name="title" placeholder="Search by title" className="px-4 py-2 rounded-md border border-slate-700 w-1/3 outline-none" onChange={handleChange}/>
            <div className='w-1/6 flex flex-col gap-1'>
              <label htmlFor='applyBy'>Application deadline:</label>
              <input name='applyBy' id='applyBy' type='date' className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={(e) => {searchByDate(e.target.value)}}/>
            </div>
            <div>
                <input name="location" list="locations" placeholder="Search by location" className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={handleChange}/>
                <datalist id="locations">
                    {
                        locationSet.map((location, index) => {
                            return <option key={index} value={location}/>
                        })
                    }
                    <option value='Remote' />
                </datalist>
            </div>
            <div className="py-2 relative border rounded-md border-slate-500 w-1/6">
                <p className={options === '' ? 'text-slate-500 text-center mr-4' : 'text-center mr-4'}>{options === '' ? 'Search by stipend' : getText(options)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20} className="absolute right-2 top-2" onClick={() => {setOpen(!open)}}><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                <AnimatePresence>
                    {open && (
                        <motion.div className="absolute top-12 left-0 bg-white border border-slate-500 rounded-md z-10 overflow-hidden" initial={{y: -10, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -10, opacity: 0}}>
                            <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('0,5000'); searchByStipend(0, 5000); setOpen(false)}}>Less than 5000</button>
                            <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('5000,10000'); searchByStipend(5000, 10000); setOpen(false)}}>5000 - 10000</button>
                            <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('10000,20000'); searchByStipend(10000, 20000); setOpen(false)}}>10000 - 20000</button>
                            <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('20000,'); searchByStipend(20000, Number.MAX_VALUE); setOpen(false)}}>More than 20000</button>
                            <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('0,'); searchByStipend(0, Number.MAX_VALUE); setOpen(false)}}>All</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </form>
      <div className="w-full md:px-14 px-7 flex flex-col gap-6 max-md:mt-24 my-10">
            {
                loading ? <p className="text-center text-3xl">Loading</p> : filteredJobs.length > 0 ? filteredJobs.map((job) => 
                <RecruiterApplicationView job={job} key={job.id} jwt={jwt}/>): <p className="text-center text-3xl">No matching results</p>
            }
      </div>
      <Footer />
    </div>
  )
}

export default JobApplications