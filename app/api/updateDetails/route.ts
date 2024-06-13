import { getJWT } from "@/actions/action";
import { API_URL } from "@/config/index";

export async function PUT(request){
    const token = await getJWT();
    if(!token){
        return Response.json({error: "Unauthorized"}, {status: 403});
    }
    const res = await request.json();
    const strapiRes = await fetch(`${API_URL}/api/users/${res.id}?populate=*`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(res.body),
    });
    const user = await strapiRes.json();
    if(strapiRes.ok){
        return Response.json({user: user}, {status: 200});
    }
    else{
        return Response.json({message: 'User forbidden'}, {status: 403});
    }
}