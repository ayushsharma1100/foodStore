'use client'

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ImageUploader({setLoading, isProfile, setLink, isTemp, setFormData}) {
    let {data:session, update} = useSession();
    async function uploadImage(e) {
        try {
            setLoading(true);
            let files = e.target.files;
            if(files && files.length) {
                let data = new FormData;
                data.append('file', files[0]);
                toast.promise(fetch('/api/profile-image', {
                    method: 'POST',
                    body: data
                }).then(res=>res.json()).then((res)=>{
                    if(isTemp) {setFormData(prev=>({...prev, image: res?.result?.secure_url})); return;}
                    isProfile ? update({...session.user, image: res?.result?.secure_url}) : setLink(res?.result?.secure_url);
                }),
                {
                    loading: 'Saving...',
                    success: 'Saved Successfully!',
                    error: 'Could not save.'
                })
            }
        }
        catch(error) {
            console.log('error uploading image', error);
            toast.error('Image not uploaded!', {position: 'bottom-left'});
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <label className="w-min mx-auto">
            <input type="file" className="hidden" onChange={uploadImage} />
            <span type="button" className="ms-auto px-5 py-1 border border-slate-400 rounded-lg">Edit</span>
        </label>
    );
}