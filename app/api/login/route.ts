import { API_URL } from "@/config/index";
import { serialize } from "cookie";

export async function POST(request) {
    const res = await request.json();
    const strapiRes = await fetch(`${API_URL}/api/auth/local?populate=*`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(res)
    });
    const data = await strapiRes.json();
    if(strapiRes.ok){
        return Response.json({user: data.user}, {status: 200, 
        headers: {
            'Set-Cookie': serialize('token', data.jwt, {
                maxAge: 60*60*24*7,
                path: '/',
                sameSite:'strict',
                secure: process.env.NODE_ENV !== 'production',
                httpOnly: true,
            })
        }});
    }
    else{
        return Response.json({error: data.error.message}, {status: data.error.status});
    }
}