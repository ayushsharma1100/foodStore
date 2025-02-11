'use client'
import Image from "next/image";
import MenuItems from "../Menu/MenuItems";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [menuItem, setMenuItem] = useState([]);
  useEffect(()=>{
    fetch('/api/menu-item').then(res=>res.json()).then(res=>setMenuItem(res?.items.slice(-6)));
  }, [])
  return (
    <section>
        <div className="relative">
            <Image className="absolute left-0 -top-16 -z-10" src={'/sallad1.png'} alt="sallad" width={109} height={189} />
            <Image className="absolute right-0 -top-28 -z-10" src={'/sallad2.png'} alt="sallad" width={107} height={195} />
        </div>
        <div className="text-center">
            <SectionHeader subHeading={'Check Out'} mainHeading={'Latest Release'} />
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center">
            {menuItem?.map(item=>{
              return (
                <MenuItems key={item?._id} item={item} />
              );
            })}
        </div>
    </section>
  )
}
