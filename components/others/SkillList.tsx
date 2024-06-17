'use client';
import {AnimatePresence, motion} from 'framer-motion'
import { useState } from 'react';

const SkillList = ({skills, addSkill, removeSkill}: {
    skills: string[],
    addSkill: (skill: string) => void,
    removeSkill: (skill: string) => void,
}) => {
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  return (
    <div className="flex w-full gap-6 items-start">
        <p>Skills: </p>
        <div className="flex items-center gap-3 flex-wrap max-h-20 overflow-y-auto w-full">
            {
                skills.length > 0 && skills.map((skill) => (
                    <motion.div key={skill} className="flex items-center gap-2 px-3 py-1 text-white bg-green-600 rounded-full" layout>
                        <p className="text-sm">{skill}</p>
                        <button onClick={(e) => {e.preventDefault(); removeSkill(skill)}}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" width={18} height={18}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg></button>
                    </motion.div>
                ))
            }
            {
                editing && (
                    <AnimatePresence>
                        <motion.input className='border border-slate-600 rounded-md px-2 py-1 text-sm outline-none' value={newSkill} onChange={(e) => setNewSkill(e.target.value)} initial={{width: 0, opacity: 0}} animate={{width: 100, opacity: 1}} exit={{width: 0, opacity: 0}}/>
                    </AnimatePresence>
                )
            }
            {
                editing ? (
                    <button className='text-sm text-blue-500' onClick={(e) => {
                        e.preventDefault();
                        if(newSkill !== ''){
                            addSkill(newSkill);
                        }
                        setNewSkill('');
                        setEditing(false);
                    }}>Add</button>
                ) : (
                    <button className='text-sm text-blue-500' onClick={(e) => {e.preventDefault(); setEditing(true)}}>+ Add skill</button>
                )
            }
        </div>
    </div>
  )
}

export default SkillList