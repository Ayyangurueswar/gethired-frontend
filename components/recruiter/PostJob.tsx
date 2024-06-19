'use client';
import { useScroll, AnimatePresence, motion } from "framer-motion"
import DashboardHeader from "@/components/others/DashboardHeader"
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SkillList from "@/components/others/SkillList";
import Footer from "@/components/others/Footer";
import { API_URL } from "@/config";
import { useNotifs } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

const PostJob = ({jwt}: {
    jwt: string;
}) => {
  const {scrollYProgress} = useScroll();
  const {user} = useAuth();
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const {addNotification} = useNotifs()
  const router = useRouter();
  const addSkill = (skill: string) => {
    setSkillsRequired([...skillsRequired, skill]);
  }
  const removeSkill = (skill: string) => {
    setSkillsRequired(skillsRequired.filter(s => s!== skill));
  }
  const [jobDetails, setJobDetails] = useState({
    title: "",
    stipend: "",
    mode: "Remote",
    skills: "",
    applyBy: new Date().toISOString().slice(0, 10),
    domain: "",
    company: user ? user.username : '',
    location: "Remote",
    jobDesc: "",
  });
  const handleChange = (e: any) => {
    setJobDetails({...jobDetails, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('data', JSON.stringify({
        ...jobDetails,
        skills: skillsRequired.join(','),
    }))
    const res = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: formData
    })
    const data = await res.json();
    if(res.ok){
        addNotification({content: 'Job posted successfully', type: 'success'});
        router.push('/account/dashboard/recruiter');
    }
    else{
        addNotification({content: data.error, type: 'error'})
    }
    setLoading(false);
  }
  return (
    <div className="w-full overflow-y-auto">
        <DashboardHeader progress={scrollYProgress}/>
        <form className="md:grid md:grid-cols-2 flex flex-col w-full mt-24 md:px-20 px-8 gap-10">
            <div className="flex flex-col gap-2 md:w-3/4 w-full">
                <label htmlFor="title">Job title</label>
                <input name="title" id="title" className="px-4 py-2 border border-slate-700 rounded-md outline-none" onChange={handleChange}/>
            </div>
            <div className="flex flex-col gap-2 md:w-3/4 md:ml-auto w-full">
                <label htmlFor="stipend">Stipend</label>
                <input name="stipend" id="stipend" type="number" className="px-4 py-2 border border-slate-700 rounded-md outline-none" onChange={handleChange}/>
            </div>
            <div className="flex w-full items-center justify-around">
                <div className="w-2/5 flex flex-col gap-2">
                    <label htmlFor="mode">Mode</label>
                    <select name="mode" id="mode" onChange={handleChange} className="border border-slate-700 px-4 py-2 outline-none rounded-md">
                        <option value="Remote">Remote</option>
                        <option value="In-office">In-office</option>
                    </select>
                </div>
                <div className="w-2/5">
                    <AnimatePresence>
                        {
                            jobDetails.mode === "In-office" && (
                                <motion.div className="flex flex-col gap-2" initial={{x: -200, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: -200, opacity: 0}}>
                                    <label htmlFor="location">Location</label>
                                    <input name="location" id="location" className="px-4 py-2 border border-slate-700 rounded-md outline-none" onChange={handleChange}/>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex w-full items-center justify-around">
                <div className="w-2/5 flex flex-col gap-2">
                    <label htmlFor="domain">Domain</label>
                    <input name="domain" id="domain" className="px-4 py-2 border border-slate-700 rounded-md outline-none" onChange={handleChange}/>
                </div>
                <div className="w-2/5 flex flex-col gap-2">
                    <label htmlFor="applyBy">Apply by</label>
                    <input type="date" name="applyBy" id="applyBy" className="px-4 py-2 border border-slate-700 rounded-md outline-none" min={new Date().toISOString().slice(0, 10)} onChange={handleChange}/>
                </div>
            </div>
            <div className="col-span-2">
                <SkillList skills={skillsRequired} addSkill={addSkill} removeSkill={removeSkill}/>
            </div>
            <div className="col-span-2 flex items-start gap-4">
                <label htmlFor="description">Description:</label>
                <textarea className="border border-slate-700 rounded-md px-4 py-2 resize-none w-3/4 h-36 outline-none"/>
            </div>
        </form>
        {loading && <p>Loading...</p>}
        <div className="w-full my-6 flex items-center justify-center">
            <motion.button className="w-1/6 mx-auto bg-slate-900 text-white py-2 rounded-md" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={handleSubmit} disabled={loading}>Post</motion.button>
        </div>
        <Footer />
    </div>
  )
}

export default PostJob