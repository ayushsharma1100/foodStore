import Link from "next/link";

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
        <nav className="flex gap-6 items-center font-semibold text-gray-500">
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'} className="px-8 py-2 bg-primary text-white rounded-full">
              Register
          </Link>
        </nav>
      </header>
  )
}
