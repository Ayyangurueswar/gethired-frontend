export interface Job {
    id: string;
    title: string;
    skills: string;
    stipend: number;
    date: string;
    domain: string;
    mode: string;
    location: string;
    company: string;
    jobDesc: string;
    createdAt?: string;
    updatedAt?: string;
    applications: Application[];
    postedBy: User;
}

export interface User {
    id: string;
    username: string;
    email: string;
    provider?: string;
    confirmes?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    type: string;
    skills: string;
    contact: string;
    location: string;
    experience?: string;
    about?: string;
    url?: string;
    jobsPosted?: Job[],
    applications?: Application[];
    profilePicture?: any;
}

export interface Application {
    id: string;
    name: string;
    skills?: string;
    contact: string;
    location: string;
    canStartFrom: string;
    experience?: string;
    job: {
        data: {
            id: number,
            attributes: Job,
        },
        meta?: any
    };
    resume?: any;
    user: User;
    cover: string;
    status: string;
    applicationFor: number
    createdAt?: string
    updatedAt?: string;
}