'use client'
import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e)=>{
        setFormData(prevState=>({...prevState, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        res = await res.json();
        console.log(res);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-3xl">Register</h1>
            <form className="max-w-xs mx-auto mt-8" onSubmit={handleSubmit}>
                <input type="email" name="email" id="" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" id="" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Register</button>
                <div className="text-gray-500 text-center my-2">or login with provider</div>
                <button className="flex items-center justify-center gap-1"><Image src={'/google.png'} alt="" height={24} width={24} />Login with google</button>
            </form>
        </section>
    );
}