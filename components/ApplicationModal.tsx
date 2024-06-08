import Link from "next/link";
import { motion } from "framer-motion";

const ApplicationModal = ({jobDetails, user}: {
    jobDetails: any;
    user: any;
}) => {
  return (
    <div className="mt-5 px-6 flex flex-col gap-8">
        <h2 className="text-center text-3xl font-semibold">Application for {jobDetails.title} at {jobDetails.company}</h2>
        <div className="flex items-center justify-between">
            <p>Your details will be shared to the employer directly from your profile.</p>
            <Link href='/updateProfile/candidate' className="bg-slate-900 text-white px-6 py-2 rounded-md">Update Profile</Link>
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="cover">Cover Letter:</label>
            <textarea name="cover" id="cover" rows={5} className="w-1/2 resize-none outline-none border border-slate-600 rounded-md px-3 py-1" 
            placeholder="Mention why you would be a good fit for this role"></textarea>
        </div>
        <div className="flex items-center gap-4">
            <label htmlFor="resume">Custom resume (optional)</label>
            <button className="relative px-6 py-2 bg-slate-900 text-white rounded-md">
                <input type="file" name="resume" id="resume" className="opacity-0 absolute top-0 left-0 w-full h-full" />
                <p>Choose file</p>
            </button>
        </div>
        <motion.button className="bg-slate-900 text-white px-6 py-2 w-1/4 rounded-md mx-auto" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>Apply</motion.button>
    </div>
  )
}

export default ApplicationModal