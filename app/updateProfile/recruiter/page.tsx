import { getJWT } from "@/actions/action"
import UpdateProfileRecruiter from "@/components/UpdateProfileRecruiter";

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <UpdateProfileRecruiter jwt={token.value}/>
  )
}

export default page