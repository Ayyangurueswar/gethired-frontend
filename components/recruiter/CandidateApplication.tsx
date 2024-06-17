'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../modals/Modal";
import { API_URL } from "@/config";
import { useNotifs } from "@/context/NotificationContext";
import { User, Job } from "@/constants/types";

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

const CandidateApplication = ({
  application,
  jwt,
  shortlisted,
}: {
  application: Application;
  jwt: string;
  shortlisted: boolean;
}) => {
  const {addNotification} = useNotifs()
  const [shortlist, setShortlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reject, setReject] = useState(false);
  const [remove, setRemove] = useState(false);
  const handleShortList = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('data', JSON.stringify({
        'status': 'Shortlisted'
    }))
    const res = await fetch(`${API_URL}/api/applications/${application.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: formData
    });
    const data = await res.json();
    setLoading(false);
    if(res.ok){
        setShortlist(false);
        location.reload();
        addNotification({content: 'Candidate shortlisted', type: 'success'});
    }
    else{
        addNotification({content: `Something went wrong: ${data.error.message}`, type: 'error'});
    }
  }
  const handleReject = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('data', JSON.stringify({
        'status': 'Rejected'
    }))
    const res = await fetch(`${API_URL}/api/applications/${application.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: formData
    });
    const data = await res.json();
    setLoading(false);
    if(res.ok){
        setReject(false);
        location.reload();
        addNotification({content: 'Candidate removed', type: 'success'});
    }
    else{
        addNotification({content: `Something went wrong: ${data.error.message}`, type: 'error'});
    }
  }
  const handleRemove = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      'status': 'Under review',
    }))
    const res = await fetch(`${API_URL}/api/applications/${application.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: formData
    });
    const data = await res.json();
    setLoading(false);
    if(res.ok){
        setRemove(false);
        location.reload();
        addNotification({content: 'Candidate removed from shortlist', type: 'success'});
    }
    else{
        addNotification({content: `Something went wrong: ${data.error.message}`, type: 'error'});
    }
  }
  return (
    <div
      key={application.id}
      className="w-full border border-slate-500 rounded-md flex flex-col gap-4 px-6 py-4 shadow-lg shadow-slate-600"
    >
      <p className="text-xl font-semibold">{application.user.username}</p>
      <div className="flex items-center w-full gap-4">
        <p className="w-1/4">Skills:</p>
        <div className="flex items-center gap-2 flex-wrap">
          {application.skills?.split(",")
            .slice(0, Math.min(3, application.skills.split(",").length))
            .map((skill: string) => (
              <div
                key={skill}
                className={`text-sm ${
                  application.job.skills?.toLowerCase()
                    .includes(skill.toLowerCase())
                    ? "bg-green-600"
                    : "bg-red-600"
                } text-white rounded-full px-3 py-1`}
              >
                {skill}
              </div>
            ))}
          {
            application.skills && application.skills.split(",").length > 3 && (
              <span className="text-sm">
                + {application.skills.split(",").length - 3} more
              </span>
            )
          }
        </div>
      </div>
      <div className="flex items-center gap-4 w-full">
        <p className="w-1/4">Cover:</p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {application.cover}
        </p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <Link
          href={`/applications/applicant/${application.id}`}
          className="text-sm"
        >
          View details
        </Link>
        {!shortlisted && <motion.button
          className="bg-green-600 text-sm px-4 py-1 rounded-md text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShortlist(true)}
        >
          Shortlist
        </motion.button>}
        {shortlisted ? (
            <motion.button
            className="bg-red-600 text-sm px-4 rounded-md py-1 text-white"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setRemove(true)}
          >
            Remove
          </motion.button>
        ) : <motion.button
          className="bg-red-600 text-sm px-4 rounded-md py-1 text-white"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setReject(true)}
        >
          Reject
        </motion.button>}
      </div>
      <Modal onClose={() => setShortlist(false)} show={shortlist}>
          <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
            <p>Are you sure, you want to shortlist {application.user.username}</p>
            <div className="flex items-center gap-6">
                <button onClick={handleShortList}>Yes</button>
                <motion.button className="px-6 py-2 bg-slate-900 text-white rounded-md" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => setShortlist(false)}>No</motion.button>
            </div>
            {loading && <p>Loading...</p>}
          </div>
      </Modal>
      <Modal onClose={() => setReject(false)} show={reject}>
          <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
            <p>Are you sure, you want to reject {application.user.username}</p>
            <div className="flex items-center gap-6">
                <button onClick={handleReject}>Yes</button>
                <motion.button className="px-6 py-2 bg-slate-900 text-white rounded-md" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => setReject(false)}>No</motion.button>
            </div>
          </div>
      </Modal>
      <Modal onClose={() => setRemove(false)} show={remove}>
          <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
            <p>Are you sure, you want to remove {application.user.username} from shortlist</p>
            <div className="flex items-center gap-6">
                <button onClick={handleRemove}>Yes</button>
                <motion.button className="px-6 py-2 bg-slate-900 text-white rounded-md" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => setRemove(false)}>No</motion.button>
            </div>
          </div>
      </Modal>
    </div>
  );
};

export default CandidateApplication;
