'use client'
import Right from "@/components/Icons/Right";
import HeaderTabs from "@/components/layout/Tabs";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
    let {data:session, status, update} = useSession();
    let router = useRouter();
    const [menuItems, setMenuItems] = useState([]);
    useEffect(()=>{
        fetch('/api/menu-item').then(res=>{if(!res.ok) throw new Error('Something went wrong'); return res}).then(res=>res.json()).then(res=>setMenuItems(res?.items || [])).catch(err=>{throw err})
    }, []);

    if(session?.user && !session.user?.isAdmin) {
        return 'Not an admin';
    }

    function handleEdit(item) {
        router.push(`/menu-items/new?id=${item?._id}`);
    }

    return (
        <PageAuthWrapper status={status}>
            <section className="max-w-md mx-auto mt-8">
                <HeaderTabs isAdmin={session?.user?.isAdmin} />
                <Link href={'/menu-items/new'} className="button mt-8">Create new menu item {<Right />}</Link>
                {menuItems.length !== 0 && 
                    <div className="mt-8">
                        <label>Edit menu item:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {menuItems.map(item=>(
                                <div key={item?._id} className="bg-gray-200 p-2 flex flex-col gap-2 cursor-pointer" onClick={()=>handleEdit(item)}>
                                    <Image className="rounded-lg" src={item?.image} alt="image" width={124} height={124} />
                                    <h3 className="text-center">{item?.itemName}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </section>
        </PageAuthWrapper>
    );
}