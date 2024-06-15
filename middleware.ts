import { NextResponse, NextRequest } from "next/server";
import { NEXT_URL, API_URL } from "./config";
import { getJWT } from "./actions/action";

export async function middleware(req: NextRequest) {
  const recruiterRoutes = ['/applications/candidate', '/applications/review', '/jobs/post']
  const candidateRoutes = ['/applications/view', '/jobs/view'];
  const publicRoutes = ['/account/login/candidate', '/account/login/recruiter', '/account/signup/candidate', '/account/signup/recruiter']
  const token = await getJWT();
  if(publicRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.next();
  }
  if(!token && req.nextUrl.pathname !== '/'){
    return NextResponse.redirect(new URL(`${NEXT_URL}`));
  }
  const res = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`
    }
  })
  const data = await res.json();
  if(res.ok && (req.nextUrl.pathname === '/' || req.nextUrl.pathname.includes('/login'))){
    return NextResponse.redirect(new URL(`${NEXT_URL}/account/dashboard/${data.type}`))
  }
  else if(res.ok && data.type === 'candidate' && req.nextUrl.pathname.includes('recruiter')){
    return NextResponse.redirect(new URL(`${NEXT_URL}/account/dashboard/candidate`))
  }
  else if(res.ok && data.type ==='recruiter' && req.nextUrl.pathname.includes('candidate')){
    return NextResponse.redirect(new URL(`${NEXT_URL}/account/dashboard/recruiter`))
  }
  else if(res.ok && data.type === 'candidate' && recruiterRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL(`${NEXT_URL}/account/dashboard/candidate`))
  }
  else if(res.ok && data.type === 'recruiter' && candidateRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL(`${NEXT_URL}/account/dashboard/recruiter`))
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}