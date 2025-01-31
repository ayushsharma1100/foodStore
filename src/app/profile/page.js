'use client'
import Loader from "@/components/layout/Loader";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
    let {data:session, status, update} = useSession();
    let email = session?.user?.email || '';
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        phone: '',
        city: '',
        postalCode: '',
        address: '',
        country: ''
    })
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setFormData(session?.user)
    }, [session])

    function handleFormChange(e) {
        setFormData(prevState=>({...prevState, [e.target.name]: e.target.value}));
    }

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
                let temp = {...session.user};
                for(let key of Object.keys(formData)) {
                    temp[key] = formData[key];
                }
                await update(temp);
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
                    await update({...session.user, image: res?.result?.secure_url || formData.image})
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
                <form className="max-w-md mx-auto labelMargin" onSubmit={handleInfoSave}>
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col items-start justify-center">
                            <Image className="rounded-lg w-full h-full my-2" width={134} height={134} src={formData?.image} alt="Avatar" />
                            <label className="w-min mx-auto">
                                <input type="file" className="hidden" onChange={uploadImage} />
                                <span type="button" className="ms-auto px-5 py-1 border border-slate-400 rounded-lg">Edit</span>
                            </label>
                        </div>
                        <div className="grow">
                            <label>Name</label>
                            <input type="text" name="name" value={formData?.name} onChange={handleFormChange} placeholder="Enter full name" />
                            <label>Email</label>
                            <input type="email" value={email} disabled />
                            <label>Phone</label>
                            <input type="tel" name="phone" value={formData?.phone} onChange={handleFormChange} placeholder="Enter phone" />
                            <label>Address</label>
                            <input type="text" name="address" value={formData?.address} onChange={handleFormChange} placeholder="Enter address" />
                            <div className="flex gap-4">
                                <div>
                                    <label>Pin Code</label>
                                    <input type="text" name="postalCode" value={formData?.postalCode} onChange={handleFormChange} placeholder="Enter Pin Code" />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input type="text" name="city" value={formData?.city} onChange={handleFormChange} placeholder="Enter City" />
                                </div>
                            </div>
                            <label>Country</label>
                            <input type="text" name="country" value={formData?.country} onChange={handleFormChange} placeholder="Enter Country" />
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </section>
        </PageAuthWrapper>
    );
}