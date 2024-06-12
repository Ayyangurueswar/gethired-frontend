import React from 'react'
import { getJWT } from '@/actions/action';
import ApplicationDetails from '@/components/ApplicationDetails';

const page = async ({params}: {
    params: {
        id: string;
    }
}) => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <ApplicationDetails id={params.id} jwt={token.value}/>
  )
}

export default page