'use client';
import DashboardHeader from "@/components/others/DashboardHeader";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import ApplicationCard from "@/components/candidate/ApplicationCard";
import Footer from "../others/Footer";

const ApplicationView = ({jwt}: {
    jwt: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}/api/applications/me?populate=*`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
     .then(res => res.json())
     .then((data) => {setApplications(data); setFilteredApplications(data); setLoading(false)})
     .catch((err) => {console.log(err); setLoading(false)});
  }, []);
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
  const handleSearch = (e: any) => {
    setFilteredApplications(applications.filter((app) => app.job[e.target.name].toLowerCase().includes(e.target.value.toLowerCase())));
  }
  const searchByStipend = (low: number, high: number) => {
    const filtered = applications.filter((app) => app.job.stipend >= low && app.job.stipend < high);
    setFilteredApplications(filtered);
  }
  const locations = applications?.map((application) => application.job.location);
  const locationSet : string[] = [];
  new Set(locations).forEach((location) => {locationSet.push(location)});
  return (
    <>
        <div className="w-full overflow-y-auto min-h-screen">
            <DashboardHeader progress={scrollYProgress}/>
            <form className="w-full px-14 md:flex hidden items-end justify-center mt-24">
                <div className="w-full flex items-center justify-between">
                    <input name="title" placeholder="Search by title" className="px-4 py-2 rounded-md border border-slate-700 w-1/3 outline-none" onChange={handleSearch}/>
                    <input name="company" placeholder="Search by company" className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={handleSearch}/>
                    <div>
                        <input name="location" list="locations" placeholder="Search by location" className="px-4 py-2 rounded-md border border-slate-700 outline-none" onChange={handleSearch}/>
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
            <div className="w-full px-14 grid sm:max-md:grid-cols-2 grid-cols-1 gap-6 md:my-10 mt-24 mb-10">
                {
                    loading ? <p className="text-center text-3xl">Loading</p> : filteredApplications.length > 0 ? filteredApplications.map((application) => 
                        <ApplicationCard application={application} key={application.id}/>
                    ) : <p className="text-center text-3xl">No matching results</p>
                }
            </div>
        </div>
        <Footer />
    </>
  )
}

export default ApplicationView