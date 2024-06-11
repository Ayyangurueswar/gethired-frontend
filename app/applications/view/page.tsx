import { getJWT } from "@/actions/action"
import ApplicationView from "@/components/ApplicationView"

const page = async () => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <ApplicationView jwt={token.value}/>
  )
}

export default page