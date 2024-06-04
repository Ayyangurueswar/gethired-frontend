import { getJWT } from "@/actions/action";
import { API_URL } from "@/config/index";

export async function GET() {
    const token = await getJWT();
    if(!token){
        return Response.json({error: "Unauthorized"}, {status: 403});
    }
    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token.value}`
        },
    });
    const user = await strapiRes.json();
    if(strapiRes.ok){
        return Response.json({user: user}, {status: 200});
    }
    else{
        return Response.json({message: 'User forbidden'}, {status: 403});
    }
}