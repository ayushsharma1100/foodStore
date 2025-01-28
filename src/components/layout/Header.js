"use client"
import Link from "next/link";
import LoginLogout from "./LoginLogout";
import { SessionProvider } from "next-auth/react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary text-3xl font-semibold" href={'/'}>El Pizza</Link>
          <Link href={'/'}>Home</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>About</Link>
          <Link href={''}>Contact</Link>
        </nav>
        <SessionProvider>
          <LoginLogout />
        </SessionProvider>
      </header>
  )
}
