'use server';
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function action(){
    revalidateTag('collections');
}

export const editAction = async () => {
    revalidateTag('edit');
}

export const dashboardAction = async () => {
    revalidateTag('dashboard');
}

export const getJWT = () => {
    const cookieStore = cookies();
    const jwt = cookieStore.get('token');
    return jwt;
}

export const deleteCookie = () => {
    const cookieStore = cookies();
    cookieStore.delete('token');
}