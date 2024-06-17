import { getJWT } from "@/actions/action"
import UpdateProfileCandidate from "@/components/candidate/UpdateProfileCandidate";

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <UpdateProfileCandidate jwt={token.value}/>
  )
}

export default page