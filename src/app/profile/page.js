'use client'
import Loader from "@/components/layout/Loader";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
    let {data:session, status, update} = useSession();
    console.log(session)
    let email = session?.user?.email || '';
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    })
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        // console.log(session);
        setFormData({...formData, name: session?.user?.name, image: session?.user?.image})
    }, [session])

    async function handleInfoSave(e) {
        try{
            e.preventDefault();
            setLoading(true);
            let data = {
                ...formData,
                email
            }
            let response = await fetch('/api/profile', {
                method: "PUT",
                body: JSON.stringify({data}),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if(response.ok) {
                toast.success('Updated successfully', {position: 'bottom-left'});
                console.log(formData.name)
                let res = await update({name: formData.name});
                console.log(res)
            }
        }
        catch(error) {
            console.log('error updating info', error);
            toast.error('something went wrong!', {position: 'bottom-left'})
        }
        finally{
            setLoading(false);
        }
    }

    async function uploadImage(e) {
        try {
            setLoading(true);
            let files = e.target.files;
            if(files && files.length) {
                let data = new FormData;
                data.append('file', files[0]);
                data.append('email', email);
                let res = await fetch('/api/profile-image', {
                    method: 'POST',
                    body: data
                });
                if(res.ok) {
                    res = await res.json();
                    await update({image: res?.result?.secure_url || formData.image})
                    console.log(res);
                    toast('Uploaded successfully!', {position: 'bottom-left'});
                }
            }
        }
        catch(error) {
            console.log('error uploading image', error);
            toast('Image not uploaded!', {position: 'bottom-left'});
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <PageAuthWrapper status={status}>
            {loading && <Loader />}
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
                <form className="max-w-sm mx-auto" onSubmit={handleInfoSave}>
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col items-start justify-center">
                            <Image className="rounded-lg w-full h-full mb-2" width={124} height={124} objectFit="contain" src={formData.image} alt="Avatar" />
                            <label className="w-min mx-auto">
                                <input type="file" className="hidden" onChange={uploadImage} />
                                <span type="button" className="ms-auto px-5 py-1 border border-slate-400 rounded-lg">Edit</span>
                            </label>
                        </div>
                        <div className="grow">
                            <input type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="Enter full name" />
                            <input type="email" value={email} disabled />
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </section>
        </PageAuthWrapper>
    );
}