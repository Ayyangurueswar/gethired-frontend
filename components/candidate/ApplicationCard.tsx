'use client';
import { API_URL } from "@/config"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Job, Application } from "@/constants/types";
import LoadingSpinner from "../others/LoadingSpinner";

const ApplicationCard = ({application}: {
    application: Application,
}) => {
    const [job, setJob] = useState<Job>()
    useEffect(() => {
        fetch(`${API_URL}/api/jobs/${application.applicationFor}`).then((res) => res.json())
        .then((data) => setJob(data.data.attributes));
    }, []);
    return (
        (job && application) ? <div className="w-full flex items-center md:justify-between gap-6 px-6 py-4 shadow-md rounded-md shadow-slate-600 hover:scale-105 transition md:flex-row flex-col">
            <div className="md:w-1/3 w-full">
                <h3 className="text-2xl font-semibold">{job.title}</h3>
                <p className="text-slate-500">at {job.company}</p>
            </div>
            <div className="md:w-2/5 w-full flex items-center justify-between">
                <p className="text-gray-500 w-3/4 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{job.location}</p></p>
                <p className="text-gray-500 w-1/2"><Image src='/icons8-receive-cash-50.png' className="inline-block mr-2" alt="" width={20} height={20}/>&#8377; {job.stipend}</p>
            </div>
            <div className={`${application.status === 'Under review' ? 'bg-yellow-700': application.status === 'Shortlisted' ? 'bg-green-600' : 'bg-red-600'} text-white rounded-full md:px-3 px-2 py-1 max-md:mt-auto`}>{application.status}</div>
        </div>
    : <LoadingSpinner size={30} style={{marginRight: "auto", marginLeft: "auto"}}/>)
}

export default ApplicationCard