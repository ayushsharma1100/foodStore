"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import { useLoadingStore } from "@/app/store";

export default function RouteLoader() {
  const { isLoading, setLoading } = useLoadingStore();
  const pathname = usePathname(); // Updates AFTER page compiles

  useEffect(() => {
    let timeout = setTimeout(()=>{setLoading(false)}, 300);
    return ()=>{
        clearTimeout(timeout);
    } 
  }, [pathname]);

  if (!isLoading) return null;

  return (<Loader />);
}
