import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { getJWT } from "@/actions/action";
import { API_URL } from "@/config";
import { useNotifs } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

const ApplicationModal = ({jobDetails, user, id}: {
    jobDetails: any;
    user: any;
    id: string;
}) => {
  const {addNotification} = useNotifs()
  const [cover, setCover] = useState('');
  const [resume, setResume] = useState<File>();
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const handleDateChange = (date: string) => {
    const start = new Date(date).toISOString().slice(0,10);
    setStartDate(start);
  }
  const router = useRouter();
  const handleSubmit = async () => {
    if(cover === ''){
      addNotification({content: 'Please upload a cover letter', type: 'error'});
      return;
    }
    setLoading(true);
    const token = await getJWT();
    const data = {
        name: user.username,
        skills: user.skills,
        contact: user.contact,
        location: user.location,
        canStartFrom: startDate,
        experience: user.experience,
        cover: cover,
        applicationFor: Number(id),
        status: 'Under review',
    }
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if(resume){
      formData.append('files.resume', resume, `${user.username}_${id}_resume`);
    }
    const res = await fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: formData,
    });
    const datares = await res.json();
    if(res.ok){
      addNotification({content: 'Application submitted successfully', type: 'success'});
      setCover('');
      setResume(undefined);
      router.push('/jobs/view');
    }
    else{
      addNotification({content: `Error submitting application: ${datares.error.message}`, type: 'error'});
    }
    setLoading(false);
  }
  return (
    <div className="px-6 flex flex-col gap-6">
        <h2 className="text-center md:text-3xl text-xl font-semibold">Application for {jobDetails.title} at {jobDetails.company}</h2>
        <div className="flex items-center justify-between">
            <p>Your details will be shared to the employer directly from your profile.</p>
            <Link href='/updateProfile/candidate' className="bg-slate-900 text-white px-6 py-2 rounded-md">Update Profile</Link>
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="startDate">Select your preffered start date:</label>
            <input type="date" name="startDate" id="startDate" min={new Date().toISOString().slice(0, 10)} onChange={(e) => {handleDateChange(e.target.value)}} value={startDate} className="outline-none border border-slate-600 rounded-md px-3 py-1"/>
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="cover">Cover Letter:</label>
            <textarea name="cover" id="cover" rows={5} className="md:w-1/2 w-full resize-none outline-none border border-slate-600 rounded-md px-3 py-1" 
            placeholder="Mention why you would be a good fit for this role" value={cover} onChange={(e) => setCover(e.target.value)}></textarea>
        </div>
        <div className="flex items-center gap-4">
            <label htmlFor="resume">Custom resume (optional)</label>
            <button className="relative px-6 py-2 bg-slate-900 text-white rounded-md">
                <input type="file" name="resume" id="resume" className="opacity-0 absolute top-0 left-0 w-full h-full" onChange={(e) => {e.target.files && setResume(e.target.files[0])}}/>
                <p>Choose file</p>
            </button>
            {resume && <p>Selected file: {resume.name}</p>}
        </div>
        <motion.button className="bg-slate-900 text-white px-6 py-2 sm:w-1/4 rounded-md mx-auto" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={handleSubmit} disabled={loading}>{loading ? 'Applying' : 'Apply'}</motion.button>
    </div>
  )
}

export default ApplicationModal