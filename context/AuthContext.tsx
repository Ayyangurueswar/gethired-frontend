'use client';
import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { NEXT_URL } from "@/config";
import { deleteCookie } from "@/actions/action";
import { User } from "@/constants/types";

const AuthContext = createContext({
    user: {} as User | null,
    register: (user: {
        username: string;
        email: string;
        password: string;
        type: 'candidate' | 'recruiter';
        contact?: string;
        location?: string;
        experience?: string;
        skills?: string;
    }) => {},
    updateDetails: (userDetails: {
        contact: string;
        location: string;
        experience?: string;
        skills?: string;
        about?: string;
        username: string;
        url?: string;
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
    const [user, setUser] = useState<User | null>(null);
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
        contact?: string;
        location?: string;
        experience?: string;
        skills?: string;
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
            alert(`Error: ${data.error}`);
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
            alert(`Error ${data.error}`);
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
            alert(`Error: ${data.error}`)
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
        url?: string;
    }) => {
        if(!user){
            return;
        }
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
            alert(`Error updating details: ${data.error}`)
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
        <AuthContext.Provider value={{user, register, login, logout, loginRecruiter, updateDetails}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext