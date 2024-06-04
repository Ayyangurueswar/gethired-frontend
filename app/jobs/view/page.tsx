'use client';
import { API_URL } from "@/config";
import DashboardHeader from "@/components/DashboardHeader"
import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";

const Page = () => {
  const { scrollYProgress } = useScroll();
  const [jobs, setJobs] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/api/jobs?populate=*`)
     .then(res => res.json())
     .then((data) => {setJobs(data.data); setLoading(false)})
     .catch((err) => {console.log(err); setLoading(false)});
  }, [])
  const locations = jobs?.map((job) => job.attributes.location);
  const locationSet : string[] = [];
  new Set(locations).forEach((location) => {locationSet.push(location)});
  return (
    <div className="w-full h-screen overflow-y-auto">
        <DashboardHeader progress={scrollYProgress}/>
        <form className="w-full px-14 h-2/5 flex items-center justify-center">
            <div className="w-full flex items-center justify-between">
                <input name="title" placeholder="Search by title" className="px-4 py-2 rounded-md border border-slate-700 w-1/3"/>
                <input name="domain" placeholder="Search by domain" className="px-4 py-2 rounded-md border border-slate-700"/>
                <div>
                    <input name="location" list="locations" placeholder="Search by location" className="px-4 py-2 rounded-md border border-slate-700"/>
                    <datalist id="locations">
                        {
                            locationSet.map((location, index) => {
                                return <option key={index} value={location}/>
                            })
                        }
                    </datalist>
                </div>
                <select className="px-4 py-2 rounded-md border border-slate-700" name="stipend">
                    <option value=''>Search by stipend</option>
                    <option value='5000'>Less than 5000</option>
                    <option value='10000'>5000 - 10000</option>
                    <option value='20000'>10000 - 20000</option>
                    <option value='30000'>More than 20000</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Page