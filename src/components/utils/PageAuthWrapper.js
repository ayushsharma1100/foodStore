'use client'
import { redirect } from "next/navigation";

export default function PageAuthWrapper({status, children}) {
    console.log(status)
    if(status === 'loading') {
        return 'Loading...';
    }
    if(status === 'authenticated') {
        return children;
    }
    else return redirect('/login');
}