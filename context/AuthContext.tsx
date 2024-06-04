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
        type: string;
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
        checkUserLoggedIn();
    }, []);

    const register = async (user: {
        username: string;
        email: string;
        password: string;
        type: string;
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
            setError(data.error);
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
            setError(data.error);
        }
    }

    const logout = async () => {
        deleteCookie();
        setUser(null);
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
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout, loginRecruiter}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext