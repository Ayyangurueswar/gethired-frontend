'use client';
import DashboardHeader from "@/components/others/DashboardHeader";
import { API_URL } from "@/config";
import { useScroll, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/others/Footer";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/modals/Modal";
import ApplicationModal from "@/components/modals/ApplicationModal";
import { useSearchParams } from "next/navigation";
import { Job } from "@/constants/types";

const Page = ({params}: {
    params: {
        id: string,
    }
}) => {
  const {user} = useAuth();
  
  const searchParams = useSearchParams();
  const applied = searchParams.get('applied');
  const [jobDetails, setJobDetails] = useState<Job>();
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const {scrollYProgress} = useScroll();
  useEffect(() => {
    fetch(`${API_URL}/api/jobs/${params.id}?populate=*`).then((res) => res.json()).then((data) => {setJobDetails(data.data.attributes)})
    .catch((e) => console.log(e)).finally(() => setLoading(false));
  }, []);
  if(!user){
    window.location.href = "/";
    return;
  }
  const userSkills = user.skills ? user.skills.split(',').map((skill) => skill.toLowerCase()) : []; 
  return (
    <div className="w-full overflow-y-auto">
      {!show && <DashboardHeader progress={scrollYProgress}/>}
      {
        loading || !jobDetails ?  <h1 className="text-center text-3xl mt-20">Loading</h1> : (
          <div className="mt-24 px-14 w-full flex flex-col gap-10">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-8 items-start">
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-4xl font-bold">{jobDetails.title}</h1>
                    <p className="text-slate-600 text-xl">at {jobDetails.company}</p>
                  </div>
                  <div className="px-4 py-1 h-1/4 text-sm mt-2 bg-blue-500 text-white rounded-full">{jobDetails.domain}</div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                  <p className="w-3/4 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{jobDetails.location}</p></p>
                  <p className="w-1/2"><Image src='/icons8-receive-cash-50.png' className="inline-block mr-2" alt="" width={20} height={20}/>&#8377; {jobDetails.stipend}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg mb-3">Job description:</h2>
                <div className="flex flex-col gap-2">
                  {
                    jobDetails.jobDesc.split('\n').map((desc: string, index: number) => <p key={index}>{desc}</p>)
                  }
                </div>
                <div className="flex w-full gap-5 items-center mt-5">
                  <p>Skills required: </p>
                  <div className="flex gap-3">
                    {
                      jobDetails.skills.split(',').map((skill: string, index: number) => <span key={index} className={`px-3 py-1 text-sm ${userSkills.includes(skill.toLowerCase()) ? 'bg-green-600 text-white' : 'bg-red-700 text-white'} rounded-full`}>{skill}</span>)
                    }
                  </div>
                </div>
              </div>
              <motion.button className="mb-6 mx-auto px-6 py-3 text-white bg-slate-800 rounded-lg" whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} onClick={() => {setShow(true)}} disabled={applied === 'true'}>
                {applied === 'true' ? 'Already applied' : 'Apply now'}
              </motion.button>
          </div>
        )
      }
      <Modal show={show} onClose={() => {setShow(false)}}>
        <ApplicationModal jobDetails={jobDetails} user={user} id={params.id}/>
      </Modal>
      <Footer />
    </div>
  )
}

export default Page