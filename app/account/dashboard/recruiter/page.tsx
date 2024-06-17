import { getJWT } from "@/actions/action"
import ReceuiterDashboard from "@/components/recruiter/RecruiterDashboard";

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <ReceuiterDashboard jwt={token.value}/>
  )
}

export default page