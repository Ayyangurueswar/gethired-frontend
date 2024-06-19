'use client';
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useState } from "react";
import SkillList from "../others/SkillList";
import { useNotifs } from "@/context/NotificationContext";

const UpdateProfile = ({username, email, password, toggleDetails}: {
  username: string,
  email: string,
  password: string,
  toggleDetails: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const {register} = useAuth();
  const {addNotification} = useNotifs();
  const [skills, setSkills] = useState<Array<string>>([]);
  const [contact, setContact] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const addSkill = (skill: string) => {
    setSkills([...skills, skill]);
  }
  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s!== skill));
  }
  const handleSubmit = () => {
    const skillList = skills.join(',');
    register({username, email, password, type: 'candidate', contact, location, experience, skills: skillList});
    if(contact === '' || location === '' || experience === '' || skills.length === 0){
      addNotification({content: 'You can update your details in the update profile section', type: 'info'});
    }
  }
  return (
    <motion.div className="w-full h-full flex flex-col justify-between max-md:px-6" initial={{x: 200, opacity:0}} animate={{x: 0, opacity: 1}} exit={{x: -100, opacity: 0}}>
        <h1 className="text-center text-3xl font-semibold max-md:mb-4">Update details</h1>
        <div className="flex flex-col gap-6">
          <div className="w-full flex items-center md:justify-between gap-4">
            <div className="md:w-5/12">
              <label htmlFor="contact">Contact</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-600 rounded-md outline-none" id="contact" value={contact} onChange={(e) => setContact(e.target.value)}/>
            </div>
            <div className="md:w-5/12">
              <label htmlFor="location">Location</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-600 rounded-md outline-none" id="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
          </div>
          <SkillList skills={skills} addSkill={addSkill} removeSkill={removeSkill} />
          <div className="w-full">
            <label htmlFor="experience">Experience</label>
            <textarea className="w-full px-4 py-2 border border-slate-600 rounded-md outline-none resize-none h-40" placeholder="Write about your previous experience (if any)." id="experience" value={experience} onChange={(e) => setExperience(e.target.value)}/>
          </div>
          <div className="flex items-center w-1/2 justify-between mx-auto">
            <button onClick={() => toggleDetails(true)}>Back</button>
            <motion.button onClick={handleSubmit} className="px-6 py-2 bg-slate-900 text-white rounded-md" whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>Submit</motion.button>
          </div>
        </div>
    </motion.div>
  )
}

export default UpdateProfile