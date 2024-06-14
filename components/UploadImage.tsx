'use client';
import { API_URL } from '@/config';
import React, { useState } from 'react'
import { useNotifs } from '@/context/NotificationContext';

const UploadImage = ({setImagePreview, jwt, userId, imageUploaded}: {
    setImagePreview: React.Dispatch<React.SetStateAction<string>>,
    jwt: string,
    userId: number,
    imageUploaded: () => void
}) => {
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const {addNotification} = useNotifs();
  const handleSubmit = async () => {
    if(image){
        setLoading(true);
        const formData = new FormData();
        formData.append('ref', 'plugin::users-permissions.user');
        formData.append('refId', String(userId));
        formData.append('files', image);
        formData.append('field', 'profilePicture');
        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            body: formData
        });
        const data = await res.json();
        setLoading(false);
        if(res.ok){
            setImagePreview(data[0].formats.thumbnail.url);
            addNotification({content: 'Updated profile picture', type: 'success'});
            imageUploaded();
        }
        else{
            addNotification({content: `Error uploading profile picture: ${data.error.message}`, type: 'error'});
        }
    }
    else{
        addNotification({content: 'Please select an image', type: 'info'});
    }
  }
  return (
    <div className='flex flex-col items-center gap-6 mt-5'>
        <div className='relative'>
            <input type='file' accept='image/jpeg' className='opacity-0 absolute top-0 right-0 w-full h-full' onChange={(e) => setImage(e.target.files[0])}/>
            <button className='bg-slate-900 text-white px-4 py-2 rounded-md'>Upload an image</button>
        </div>
        {loading && (<p>Uploading...</p>)}
        {image && (
            <p>Selected file: {image.name}</p>
        )}
        <button onClick={handleSubmit}>Done</button>
    </div>
  )
}

export default UploadImage