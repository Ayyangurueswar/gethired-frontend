import { getJWT } from "@/actions/action"
import JobApplications from "@/components/JobApplications";

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <JobApplications jwt={token.value}/>
  )
}

export default page