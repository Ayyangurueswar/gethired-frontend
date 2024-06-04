import { API_URL } from "@/config"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";

const LatestJobs =  () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/api/jobs?populate=*`)
     .then(res => res.json())
     .then((data) => {setJobs(data.data); setLoading(false)})
     .catch((err) => {console.log(err); setLoading(false)});
  }, [])
  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <div className="w-4/5 flex items-center gap-10 h-1/3">
        {jobs.map((job) => (
            <div key={job.id} className="flex flex-col w-1/3 justify-between h-full border border-slate-800 rounded px-6 py-4">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{job.attributes.title}</h1>
                        <p className="text-gray-500">at {job.attributes.company}</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <p className="text-gray-500 w-1/2 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{job.attributes.mode === 'Remote' ? 'Remote' : job.attributes.location}</p></p>
                        <p className="text-gray-500"><Image src='/icons8-receive-cash-50.png' className="inline-block mr-2" alt="" width={20} height={20}/>{job.attributes.stipend}</p>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between">
                    <Link href={`/jobs/view/${job.id}`}>View details</Link>
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg">Apply now</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default LatestJobs