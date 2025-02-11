"use client"
import { useLoadingStore } from "@/app/store";
import { CartContext } from "@/contextProvider/CartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ShoppingCart from "../Icons/ShoppingCart"
import { useContext, useEffect, useState } from "react";

export default function LoginLogout() {
    let session = useSession();
    const [userName, setUserName] = useState('');
    let {setLoading} = useLoadingStore();
    let {cart, addToCart} = useContext(CartContext);

    useEffect(()=>{
        if(localStorage.getItem('cart')) addToCart(JSON.parse(localStorage.getItem('cart')));
      }, [])

    useEffect(()=>{
        let temp = session?.data?.user?.name || session?.data?.user?.email;
        if(temp && temp.includes(' ')) {
            temp = temp.split(' ')[0];
        }
        setUserName(temp);
    }, [session])
    return (
        <>
            {session.status === 'unauthenticated' &&<nav className="flex gap-6 items-center font-semibold text-gray-500">
                <Link onClick={()=>setLoading(true)} href={'/login'}>Login</Link>
                <Link onClick={()=>setLoading(true)} href={'/register'} className="px-8 py-2 bg-primary text-white rounded-full">
                    Register
                </Link>
            </nav>}
            {session.status === 'authenticated' && <nav className="flex gap-6 items-center font-semibold text-gray-500">
                <Link className="whitespace-nowrap" onClick={()=>setLoading(true)} href={'/profile'}>Hello, {userName}</Link>
                <button className="px-8 py-2 bg-primary text-white rounded-full" onClick={()=>{signOut({callbackUrl: '/login'});}}>Logout</button>
                <Link className="relative" href={'/cart'}>
                    <ShoppingCart />
                    <span className="bg-primary text-white text-xs absolute -top-1 -right-3 rounded-full px-1">
                        {cart?.length}
                    </span>
                </Link>
            </nav>}
            {/* {session.status === 'loading' && <nav className="flex gap-6 items-center font-semibold text-gray-500">
                <button className="flex gap-6 items-center font-semibold text-gray-500 border-0" disabled={true}>Loading...</button>
            </nav>} */}
        </>
    );
}