'use client'
import MenuItems from "@/components/Menu/MenuItems";
import PageAuthWrapper from "@/components/utils/PageAuthWrapper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Menu() {
    let {status} = useSession();
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetch('/api/menu-item').then(res=>res.json()).then(res=>setMenuItems(res?.items));
        fetch('/api/category').then(res=>res.json()).then(res=>setCategories(res));
      }, [])

    return (
        <PageAuthWrapper status={status}>
            <section className="mt-8 max-w-full mx-auto">
                {categories?.length > 0 && categories?.map(category=>{
                    return (
                        <div key={category?._id}>
                            <div className="text-center text-primary text-4xl">
                                {category?.name}
                            </div>
                            <div className="grid grid-cols-3 gap-4 place-items-center my-4">
                                {menuItems?.length > 0 && menuItems?.filter(item=>item?.category === category?._id).map(item=>{
                                    return (
                                        <MenuItems key={item?._id} item={item} />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </section>
        </PageAuthWrapper>
    );
}