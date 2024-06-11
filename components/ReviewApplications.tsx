'use client';
import React, { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion';
import DashboardHeader from '@/components/DashboardHeader';
import { API_URL } from '@/config';

const ReviewApplications = ({jobId, jwt}: {
    jobId: string,
    jwt: string,
}) => {
  const { scrollYProgress } = useScroll();
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/api/applications/getApplications`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        
    })
  })
  return (
    <div className='w-full overflow-y-auto'>
        <DashboardHeader progress={scrollYProgress}/>
        
    </div>
  )
}

export default ReviewApplications