'use client';
import React, { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import { API_URL } from '@/config';
import Image from 'next/image';
import Link from 'next/link';

const ApplicationDetails = ({jwt, id}: {
    jwt: string,
    id: string,
}) => {
  const { scrollYProgress } = useScroll();
  const [applicationDetails, setApplicationDetails] = useState({});
  useEffect(() => {
    fetch(`${API_URL}/api/applications/${id}?populate=*`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }).then((res) => res.json()).then((data) => {
        setApplicationDetails(data.data.attributes);
    })
  }, [])
  console.log(applicationDetails);
  return (
    <div className='w-full'>
        <DashboardHeader progress={scrollYProgress}/>
        <div className='flex flex-col gap-6 px-20 w-full'>
            <div className='flex items-center justify-between mt-24'>
                <div className='flex flex-col gap-4'>
                    <p className='text-3xl font-semibold'>{applicationDetails.name}</p>
                    <p>{applicationDetails.cover}</p>
                    {applicationDetails.resume && <Link href={applicationDetails.resume.data.attributes.url} className='px-6 text-center py-2 bg-slate-900 text-white rounded-md'>View resume</Link>}
                </div>
                <div className='flex items-center w-1/3 justify-between'>
                    <div className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" width="20px" height="20px" viewBox="0 0 64 64" version="1.1" xmlSpace="preserve">
                            <path d="M62.9891,2.5618c-0.0765-0.5779-0.6611-0.9805-1.2299-0.8401L7.4043,15.2065c-0.3535,0.0879-0.6318,0.3608-0.7256,0.7129     s0.0112,0.7275,0.2744,0.9795l13.9343,13.3583l-2.7649,17.1495c-0.1079,0.6712,0.4969,1.2576,1.1582,1.1445l18.0805-3.1324     l17.1832,9.6988c0.1523,0.0859,0.3218,0.1289,0.4917,0.1289c0.1523,0,0.3047-0.0347,0.4453-0.1045     c0.2969-0.1475,0.5015-0.4331,0.5459-0.7617l6.9639-51.5542C63.0031,2.7372,63.0007,2.6487,62.9891,2.5618z M9.647,16.7109     L56.8914,4.9902L22.2545,28.7978L9.647,16.7109z M36.9146,43.4663l-16.5942,2.875l2.4995-15.5054L58.8633,6.0615L36.9146,43.4663     z M54.2427,52.6504l-15.3231-8.6492l21.4231-36.509L54.2427,52.6504z"/>
                            <path d="M14.4438,51.6099l-4.6948,5.209c-0.3701,0.4102-0.3369,1.0425,0.0732,1.4121c0.1909,0.1724,0.4307,0.2573,0.6689,0.2573     c0.2734,0,0.5459-0.1113,0.7432-0.3306l4.6948-5.209c0.3701-0.4102,0.3369-1.0425-0.0732-1.4121     C15.4463,51.1675,14.8135,51.2002,14.4438,51.6099z"/>
                            <path d="M5.9478,29.0562l-4.6909,5.2085c-0.3696,0.4106-0.3364,1.043,0.0742,1.4126c0.1909,0.1719,0.4302,0.2568,0.6685,0.2568     c0.2739,0,0.5459-0.1113,0.7437-0.3311l4.6909-5.2085c0.3696-0.4106,0.3364-1.043-0.0742-1.4126     C6.9487,28.6128,6.3179,28.6455,5.9478,29.0562z"/>
                            <path d="M40.8164,55.4331l-4.6909,5.2051c-0.3701,0.4102-0.3369,1.0425,0.0732,1.4121c0.1909,0.1724,0.4307,0.2573,0.6689,0.2573     c0.2734,0,0.5459-0.1113,0.7432-0.3306l4.6909-5.2051c0.3701-0.4102,0.3369-1.0425-0.0732-1.4121     C41.8188,54.9907,41.186,55.0234,40.8164,55.4331z"/>
                        </svg>
                        <p className='ml-2'>{applicationDetails.contact}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src='/locaion-icon.png' alt='' width={20} height={20}/>
                        <p>{applicationDetails.location}</p>
                    </div>
                </div>
                <Image src='/image1.png' alt='' width={130} height={130} className='rounded-full'/>
            </div>
        </div>
    </div>
  )
}

export default ApplicationDetails