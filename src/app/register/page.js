'use client'
import Loader from "@/components/layout/Loader";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
    let router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        setFormData(prevState=>({...prevState, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            if(!formData.email || !formData.password) {
                toast.error('Please enter email and password', {position: 'bottom-left'});
                return;
            }
            let res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            res = await res.json();
            res?.msg !== 'success' && toast.error(res.msg, {position: 'bottom-left'});
            await signIn('credentials', {...formData, redirect: false});
            console.log(res);
            toast.success('User registered!', {position: 'bottom-left'});
            router.push("/");
        }
        catch(error) {
            console.log('Error uploading user...', error);
            toast.error('Something went wrong!', {position: 'bottom-left'});
        }
        finally {
            setLoading(false);
        }
    }
    


    return (
        <>
            {loading && <Loader />}
            <section className="mt-8">
                <h1 className="text-center text-primary text-3xl">Register</h1>
                <form className="max-w-xs mx-auto mt-8" onSubmit={handleSubmit}>
                    <input type="email" name="email" id="" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" id="" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <button type="submit" disabled={loading}>Register</button>
                    <div className="text-gray-500 text-center my-2">or login with provider</div>
                    <button type="button" onClick={()=>signIn('google', {callbackUrl: '/'})} className="flex items-center justify-center gap-1"><Image src={'/google.png'} alt="" height={24} width={24} />Login with google</button>
                </form>
            </section>
        </>
    );
}