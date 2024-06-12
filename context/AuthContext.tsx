'use client';
import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { NEXT_URL } from "@/config";
import { deleteCookie } from "@/actions/action";

const AuthContext = createContext({
    user: null,
    error: null,
    register: (user: {
        username: string;
        email: string;
        password: string;
        type: 'candidate' | 'recruiter';
        contact: string;
        location: string;
        experience: string;
        skills: string;
    }) => {},
    updateDetails: (userDetails: {
        contact: string;
        location: string;
        experience?: string;
        skills?: string;
        about?: string;
        username: string;
        perks?: string;
    }) => {},
    login: ({email, password}: {email: string, password: string}) => {},
    loginRecruiter: ({email, password}: {email: string, password: string}) => {},
    logout: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        checkUserLoggedIn().then(() => {setLoading(false)})
    }, []);

    const register = async (user: {
        username: string;
        email: string;
        password: string;
        type: 'candidate' | 'recruiter';
        contact: string;
        location: string;
        experience: string;
        skills: string;
    }) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if(res.ok){
            setUser(data.user);
            if(data.user.type === 'candidate'){
                router.push('/account/dashboard/candidate')
            }
            else if(data.user.type === 'recruiter'){
                router.push('/account/dashboard/recruiter')
            }
        }
        else{
            return data.error;
        }
    }

    const login = async ({email: identifier, password}: {
        email: string,
        password: string;
    }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier, password
            })
        });
        const data = await res.json();
        if(res.ok){
            if(data.user.type === 'candidate'){
                setUser(data.user);
                router.push('/account/dashboard/candidate')
            }
            else if(data.user.type ==='recruiter'){
                alert('Account not found');
                return;
            }
        }
        else{
            setError(data.error);
        }
    }

    const loginRecruiter = async ({email: identifier, password}: {
        email: string,
        password: string;
    }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier, password
            })
        });
        const data = await res.json();
        if(res.ok){
            if(data.user.type === 'candidate'){
                alert('Account not found');
                return;
            }
            setUser(data.user);
            router.push('/account/dashboard/recruiter');
        }
        else{
            return data.error;
        }
    }

    const logout = async () => {
        await deleteCookie();
    }

    const updateDetails = async (userDetails: {
        contact: string;
        location: string;
        experience?: string;
        skills?: string;
        about?: string;
        username: string;
        perks?: string;
    }) => {
        const req = {id: user.id, body: userDetails};
        const res = await fetch(`${NEXT_URL}/api/updateDetails`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req)
        })
        const data = await res.json();
        if(res.ok){
            setUser(data.user);
            router.push(`/account/dashboard/${data.user.type}`);
        }
        else{
            return data.error;
        }
    }

    const checkUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();
        if(data.user){
            setUser(data.user);
        }
        else{
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout, loginRecruiter, updateDetails}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext