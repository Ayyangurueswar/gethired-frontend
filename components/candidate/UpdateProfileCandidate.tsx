'use client';
import DashboardHeader from "@/components/others/DashboardHeader"
import SkillList from "@/components/others/SkillList";
import { useAuth } from "@/context/AuthContext";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Footer from "../others/Footer";
import Modal from "../modals/Modal";
import UploadImage from "../modals/UploadImage";
import { useNotifs } from "@/context/NotificationContext";

const UpdateProfileCandidate = ({jwt}: {
    jwt: string;
}) => {
  const {scrollYProgress} = useScroll();
  const {user, updateDetails} = useAuth();
  const {addNotification} = useNotifs();
  const [newUsername, setNewUsername] = useState(user ? user.username : '');
  const [newContact, setNewContact] = useState(user ? user.contact : '');
  const [newLocation, setNewLocation] = useState(user ? user.location : '');
  const skillList : Array<string> = user ? user.skills.split(',') : [];
  const [newSkills, setNewSkills] = useState(skillList);
  const [newExperience, setNewExperience] = useState(user ? user.experience : '');
  const [show, setShow] = useState(false);
  console.log(user);
  const [imagePreview, setImagePreview] = useState<string>(user && user.profilePicture ? user.profilePicture.formats.thumbnail.url : '/image1.png');
  const addSkill = (skill: string) => {
    setNewSkills([...newSkills, skill]);
  }
  const removeSkill = (skill: string) => {
    setNewSkills(newSkills.filter(s => s!== skill));
  }
  const handleSubmit = () => {
    updateDetails({contact: newContact, location: newLocation, experience: newExperience, skills: newSkills.join(','), username: newUsername});
    addNotification({content: 'Details updated', type: 'success'});
  }
  if(!user){
    return <p>Loading...</p>
  }
  return (
    <div className="w-full overflow-y-auto">
        <DashboardHeader progress={scrollYProgress}/>
        <div className="mt-24 w-full px-14 flex flex-col gap-8 mb-5">
          <div className="w-full grid grid-cols-2 gap-8">
            <div className="flex items-center gap-3">
              <label htmlFor="username" className="w-1/4">Username: </label>
              <input type="text" name="username" id="username" className="w-full border border-slate-600 rounded-md outline-none px-3 py-1" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Image src={imagePreview} alt='user' width={100} height={100} className='rounded-full'/>
                <button className="bg-slate-950 text-while px-6 py-2 text-white rounded-md" onClick={() => setShow(true)}>Update profile picture</button>
            </div>
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
          <div className="w-1/3 flex items-center justify-between mx-auto">
            <button className="bg-slate-950 text-while px-6 py-2 text-white rounded-md" onClick={handleSubmit}>Update</button>
            <Link href='/account/update' className="px-6 py-2 bg-slate-950 text-white rounded-md ml-auto">Update password</Link>
          </div>
        </div>
        <Modal show={show} onClose={() => setShow(false)}>
            <UploadImage jwt={jwt} setImagePreview={setImagePreview} userId={Number(user.id)} imageUploaded={() => {setShow(false)}}/>
        </Modal>
        <Footer />
    </div>
  )
}

export default UpdateProfileCandidate