import { getJWT } from "@/actions/action"
import ViewJobs from "@/components/candidate/ViewJobs"

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <ViewJobs jwt={token.value}/>
  )
}

export default page