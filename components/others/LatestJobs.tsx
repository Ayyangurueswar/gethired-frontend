import { API_URL } from "@/config"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick"
import { Job } from "@/constants/types";

const LatestJobs =  ({posted, jwt}: {
  posted?: boolean;
  jwt?: string;
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/api/jobs${posted ? '/me' : ''}?populate=*`, posted ? {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    } : {})
     .then(res => res.json())
     .then((data) => {
      if(!posted){
        const jobata : Job[] = []
        data.data.map((job: {
          id: number,
          attributes: Job
        }) => {
          jobata.push({...job.attributes, id: String(job.id)});
        })
        setJobs(jobata)
      }
      else{
        setJobs(data);
      }
      setLoading(false)})
     .catch((err) => {console.log(err); setLoading(false)});
  }, [])
  const settings = {
    infinite: jobs.length > 3,
    slidesToShow: Math.min(jobs.length, 3),
    slidesToScroll: 1,
    autoplay: jobs.length > 3,
    speed: 2000,
    arrows: false,
    className: 'w-4/5',
    variableWidth: jobs.length <= 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  if(loading){
    return <h1>Loading...</h1>
  }
  if(jobs.length === 0 && posted){
    return (
      <div className="w-4/5 h-1/3 flex flex-col gap-8 items-center">
        <p>You have not posted a job</p>
        <Link href='/jobs/post' className="px-6 py-2 rounded-md bg-slate-900 text-white">Post a job</Link>
      </div>
    )
  }
  else if(jobs.length === 0){
    return (
      <div className="w-4/5 h-1/3 flex flex-col gap-8 items-center">
        <p>No jobs available right now</p>
      </div>
    )
  }
  return (
    <Slider {...settings}>
        {jobs.map((job, index) => (
            <div key={index} className="border h-full border-slate-800 rounded px-6 py-4" style={{height: '50%'}}>
              <div className="flex flex-col h-full justify-between w-full">
                <div className="flex flex-col gap-4">
                      <div>
                          <h1 className="text-2xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">{job.title}</h1>
                          {!posted && <p className="text-gray-500">at {job.company}</p>}
                      </div>
                      <div className="flex w-full items-center justify-between">
                          <p className="text-gray-500 w-1/2 overflow-ellipsis flex items-center"><Image src='/locaion-icon.png' className="inline-block mr-2" alt="" width={20} height={20}/><p className="overflow-hidden whitespace-nowrap text-ellipsis">{job.mode === 'Remote' ? 'Remote' : job.location}</p></p>
                          <p className="text-gray-500 flex items-center gap-2"><Image src='/icons8-receive-cash-50.png' alt="" width={20} height={20}/>{job.stipend}</p>
                      </div>
                  </div>
                  {
                    posted ? (
                      <Link href={`/applications/review/${job.id}`}>Review Applications</Link>
                    ) : (
                      <Link href={`/jobs/view/${job.id}`}>View details</Link>
                    )
                  }
              </div>
            </div>
        ))}
    </Slider>
  )
}

export default LatestJobs