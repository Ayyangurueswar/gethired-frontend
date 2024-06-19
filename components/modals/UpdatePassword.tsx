'use client';
import { API_URL } from "@/config";
import { useState } from "react";

const UpdatePassword = ({closeModal, jwt}: {
    closeModal: () => void;
    jwt: string;
}) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', email);
    fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: formData
    }).then((res) => res.json()).then((data) => {
        setEmailSent(true);
        setLoading(false);
    }).catch((err) => {
        console.log(err);
    })
  }
  return (
    <div className="flex flex-col items-center gap-6 mt-5">
        <input type="email" placeholder="Enter your email" className="w-72 border border-slate-700 rounded-md px-4 py-2 outline-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {emailSent  && <p>Check your inbox for further instructions</p>}
        {loading && <p>Sending...</p>}
        {emailSent ? <button onClick={closeModal} className="bg-slate-900 text-white px-6 py-2 rounded-md">Done</button> : 
        <button className="bg-slate-900 text-white px-6 py-2 rounded-md" onClick={handleSubmit} disabled={loading}>Send Email</button>}
    </div>
  )
}

export default UpdatePassword