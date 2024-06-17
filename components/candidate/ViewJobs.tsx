'use client';
import { API_URL } from "@/config";
import DashboardHeader from "@/components/others/DashboardHeader"
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/others/Footer";
import { Job, Application } from "@/constants/types";

const ViewJobs = ({jwt}: {
    jwt: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState('');
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  useEffect(() => {
    let queryString = '';
    queryString += title !== '' ? `filters[title][$containsi]=${title}` : '';
    queryString += company !== '' ? `&filters[company][$containsi]=${company}` : '';
    queryString += location !== '' ? `&filters[location][$containsi]=${location}` : '';
    const [low, high] = options !== '' ? options.split(',') : ['', ''];
    queryString += low !== '' ? `&filters[stipend][$gt]=${low}` : '';
    queryString += high !== '' ? `&filters[stipend][$lte]=${high}` : '';
    fetch(`${API_URL}/api/jobs?${queryString}&populate=*`)
     .then(res => res.json())
     .then((data) => {
        const jobData : Job[] = []
        data.data.map((job: {
            id: number;
            attributes: Job
        }) => {
            jobData.push({...job.attributes, id: String(job.id)});
        })
        setJobs(jobData);
        setLoading(false)})
     .catch((err) => {console.log(err); setLoading(false)});
    fetch(`${API_URL}/api/applications/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }).then(res => res.json())
    .then((data) => {
        const applications = data.map((app: Application) => String(app.applicationFor));
        setAppliedJobs(applications);
    })
  }, [title, location, company, options]);
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
  return (
    <div className="w-full overflow-y-auto">
        <DashboardHeader progress={scrollYProgress}/>
        <form className="w-full px-14 flex items-end justify-center mt-24">
            <div className="w-full flex items-center justify-between">
                <input name="title" placeholder="Search by title" className="px-4 py-2 rounded-md border border-slate-700 w-1/3 outline-none" onChange={(e) => setTitle(e.target.value)}/>
                <input name="company" placeholder="Search by company" className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={(e) => setCompany(e.target.value)}/>
                <div>
                    <input name="location" list="locations" placeholder="Search by location" className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={(e) => setLocation(e.target.value)}/>
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
                                    <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('0,5000'); setOpen(false)}}>Less than 5000</button>
                                    <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('5000,10000'); setOpen(false)}}>5000 - 10000</button>
                                    <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('10000,20000'); setOpen(false)}}>10000 - 20000</button>
                                    <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('20000,'); setOpen(false)}}>More than 20000</button>
                                    <button className="py-2 px-4 hover:bg-blue-500 hover:text-white w-full transition-colors" onClick={(e) => {e.preventDefault(); setOptions('0,'); setOpen(false)}}>All</button>
                                </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </form>
        <div className="w-full px-14 flex flex-col gap-6 my-10">
            {
                loading ? <p className="text-center text-3xl">Loading</p> : jobs.length > 0 ? jobs.map((job, index) => {
                    return (
                        <div key={index} className="w-full flex items-center justify-between px-6 py-4 shadow-md rounded-md shadow-slate-600 hover:scale-105 transition">
                            <div className="w-1/3">
                                <h3 className="text-2xl font-semibold">{job.title}</h3>
                                <p className="text-slate-500">at {job.company}</p>
                            </div>
                            <div className="w-2/5 flex items-center justify-between">
                                <p className="text-gray-500 w-3/4 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{job.location}</p></p>
                                <p className="text-gray-500 w-1/2"><Image src='/icons8-receive-cash-50.png' className="inline-block mr-2" alt="" width={20} height={20}/>&#8377; {job.stipend}</p>
                            </div>
                            <div className="w-1/4 flex items-center justify-between">
                                {
                                    appliedJobs.includes(job.id) && (
                                        <div className="bg-green-600 text-white px-3 py-1 rounded-md">Applied</div>
                                    )
                                }
                                <Link href={`/jobs/view/${job.id}?applied=${appliedJobs.includes(job.id)}`} className="px-6 py-2 bg-slate-900 text-white rounded-md ml-auto">View details</Link>
                            </div>
                        </div>
                    )
                }) : <p className="text-center text-3xl">No matching results</p>
            }
        </div>
        <Footer />
    </div>
  )
}

export default ViewJobs