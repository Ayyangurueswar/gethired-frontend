'use client';
import { API_URL } from "@/config"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Job, Application } from "@/constants/types";

const ApplicationCard = ({application}: {
    application: Application,
}) => {
    const [job, setJob] = useState<Job>()
    useEffect(() => {
        fetch(`${API_URL}/api/jobs/${application.applicationFor}`).then((res) => res.json())
        .then((data) => setJob(data.data.attributes));
    }, []);
    return (
        (job && application) ? <div className="w-full flex items-center justify-between px-6 py-4 shadow-md rounded-md shadow-slate-600 hover:scale-105 transition">
            <div className="w-1/3">
                <h3 className="text-2xl font-semibold">{job.title}</h3>
                <p className="text-slate-500">at {job.company}</p>
            </div>
            <div className="w-2/5 flex items-center justify-between">
                <p className="text-gray-500 w-3/4 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{job.location}</p></p>
                <p className="text-gray-500 w-1/2"><Image src='/icons8-receive-cash-50.png' className="inline-block mr-2" alt="" width={20} height={20}/>&#8377; {job.stipend}</p>
            </div>
            <div className={`${application.status === 'Under review' ? 'bg-yellow-700': application.status === 'Shortlisted' ? 'bg-green-600' : 'bg-red-600'} text-white rounded-full px-3 py-1`}>{application.status}</div>
        </div>
    : <p>Loading</p>)
}

export default ApplicationCard