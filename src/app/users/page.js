'use client'
import HeaderTabs from "@/components/layout/Tabs";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
    let {data:session, status} = useSession();
    let router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        if(!session?.user) return;
        fetch('/api/users').then(res=>res.json().then(res=>{
            let remainingUsers = res?.filter(user=>{
                return user?._id != session?.user?.id;
            }) || [];
            setUsers(remainingUsers)
        }));
    }, [session]);

    if(session?.user && !session.user?.isAdmin) {
        return 'Not an admin';
    }

    function handleUserEdit(id) {
        if(id) router.push('/profile?id=' + id);
    }

    return (
        <PageAuthWrapper status={status}>
            <section className="max-w-md mx-auto mt-8">
                <HeaderTabs isAdmin={session?.user?.isAdmin} />
                <div className="text-gray-500 mt-4">Users:</div>
                {users.map(user=>{
                    return (
                        <div key={user?.email} className="bg-gray-200 p-2 rounded-md my-1 flex gap-2 items-center">
                            <div className="grow grid grid-cols-2 items-center">
                                <span>{user?.name}</span>
                                <span className="text-gray-700 break-words">{user?.email}</span>
                            </div>
                            <div>
                                <button onClick={()=>handleUserEdit(user?._id)} type="button" className="bg-white disabled:cursor-not-allowed">Edit</button>
                            </div>
                        </div>
                    );
                })}
            </section>
        </PageAuthWrapper>
    );
}