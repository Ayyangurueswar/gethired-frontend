import { getJWT } from "@/actions/action"
import PostJob from "@/components/recruiter/PostJob";

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <PostJob jwt={token.value}/>
  )
}

export default page