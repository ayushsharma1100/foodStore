'use client'
import Loader from "@/components/layout/Loader";
import HeaderTabs from "@/components/layout/Tabs";
import ImageUploader from "@/components/utils/ImageUploader";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    let {data:session, status, update} = useSession();
    let params = useSearchParams();
    let id = params.get('id');
    let router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        phone: '',
        city: '',
        postalCode: '',
        address: '',
        country: '',
        isAdmin: false
    })
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(!id) setFormData(session?.user);
    }, [session]);

    useEffect(()=>{
        if(id) {
            setLoading(true);
            fetch('/api/users?id=' + id).then(res=>res.json()).then(res=>setFormData(prev=>({...prev, ...res}))).finally(setLoading(false));
        }
    }, []);

    function handleFormChange(e) {
        setFormData(prevState=>({...prevState, [e.target.name]: e.target.value}));
    }

    async function handleInfoSave(e) {
        try{
            e.preventDefault();
            setLoading(true);
            let data = {
                ...formData
            }
            toast.promise(fetch('/api/profile', {
                method: "PUT",
                body: JSON.stringify({data}),
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(()=>{
                if(!id){
                    let temp = {...session.user};
                    for(let key of Object.keys(formData)) {
                        temp[key] = formData[key];
                    }
                    update(temp);
                }
                else router.push('/users');
            }), {
                loading: 'Saving...',
                success: 'Saved Successfully!',
                error: 'Could not save.'
            })
        }
        catch(error) {
            console.log('error updating info', error);
            toast.error('something went wrong!', {position: 'bottom-left'})
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <PageAuthWrapper status={status}>
            {loading && <Loader />}
            <section className="mt-8">
                <HeaderTabs isAdmin={session?.user?.isAdmin} />
                <form className="max-w-md mx-auto labelMargin mt-8" onSubmit={handleInfoSave}>
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col items-start justify-center">
                            <Image className="rounded-lg w-full h-full my-2" width={134} height={134} src={formData?.image} alt="Avatar" />
                            {id ? <ImageUploader setLoading={setLoading} isTemp={true} setFormData={setFormData} /> : <ImageUploader setLoading={setLoading} isProfile={true} />}
                        </div>
                        <div className="grow">
                            <label>Name</label>
                            <input type="text" name="name" value={formData?.name} onChange={handleFormChange} placeholder="Enter full name" />
                            <label>Email</label>
                            <input type="email" value={formData?.email} disabled />
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
                            {(id || session?.user?.isAdmin) &&
                                <div className="my-2">
                                        <label htmlFor="admin">
                                            <input type="checkbox" id="admin" checked={formData?.isAdmin} onChange={e=>setFormData(prev=>({...prev, isAdmin: e.target.checked}))} />
                                            <span className="px-1 text-lg">Admin</span>
                                        </label>
                                </div>
                            }
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </section>
        </PageAuthWrapper>
    );
}