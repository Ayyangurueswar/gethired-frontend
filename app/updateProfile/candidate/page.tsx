'use client';
import DashboardHeader from "@/components/DashboardHeader"
import SkillList from "@/components/SkillList";
import { useAuth } from "@/context/AuthContext";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useNotifs } from "@/context/NotificationContext";

const Page = () => {
  const {scrollYProgress} = useScroll();
  const {user, updateDetails} = useAuth();
  const [newUsername, setNewUsername] = useState(user.username);
  const [newContact, setNewContact] = useState(user.contact);
  const [newLocation, setNewLocation] = useState(user.location);
  const skillList : Array<string> = user.skills ? user.skills.split(',') : [];
  const [newSkills, setNewSkills] = useState(skillList);
  const [newExperience, setNewExperience] = useState(user.experience);
  const {addNotification} = useNotifs();
  const addSkill = (skill: string) => {
    setNewSkills([...newSkills, skill]);
  }
  const removeSkill = (skill: string) => {
    setNewSkills(newSkills.filter(s => s!== skill));
  }
  const handleSubmit = () => {
    const error = updateDetails({contact: newContact, location: newLocation, experience: newExperience, skills: newSkills.join(','), username: newUsername})
    if(error){
      addNotification({content: error, type: 'error'});
      return;
    }
    addNotification({content: 'Details updated successfully', type:'success'});
  }
  return (
    <div className="w-full overflow-y-auto">
        <DashboardHeader progress={scrollYProgress}/>
        <div className="mt-24 w-full px-14 flex flex-col gap-8">
          <div className="w-full grid grid-cols-2 gap-8">
            <div className="flex items-center gap-3">
              <label htmlFor="username" className="w-1/4">Username: </label>
              <input type="text" name="username" id="username" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
            </div>
            <Link href='/account/update' className="px-6 py-3 bg-slate-950 text-white rounded-md ml-auto">Update email or password</Link>
            <div className="flex items-center gap-3">
              <label htmlFor="contact" className="w-1/4">Contact: </label>
              <input type="tel" name="contact" id="contact" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={newContact} onChange={(e) => setNewContact(e.target.value)}/>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="location" className="w-1/4">Location: </label>
              <input name="location" id="location" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/>
            </div>
          </div>
          <SkillList skills={newSkills} addSkill={addSkill} removeSkill={removeSkill} />
          <div className="flex flex-col gap-2">
            <label htmlFor="experience">Experience:</label>
            <textarea id="experience" className="border border-slate-700 rounded-md px-3 py-1 resize-none outline-none w-1/2 h-36" value={newExperience} onChange={(e) => setNewExperience(e.target.value)}/>
          </div>
          <button className="bg-slate-950 text-while px-6 py-2 w-1/6 text-white rounded-md mx-auto" onClick={handleSubmit}>Update</button>
        </div>
    </div>
  )
}

export default Page