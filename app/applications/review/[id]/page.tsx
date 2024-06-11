import { getJWT } from "@/actions/action"
import ReviewApplications from "@/components/ReviewApplications";

const page = async ({params}: {
    params: {
      id: string
    }
}) => {
  const token = await getJWT();
  if(!token){
    window.location.href = "/";
    return;
  }
  return (
    <ReviewApplications jobId={params.id} jwt={token.value}/>
  )
}

export default page