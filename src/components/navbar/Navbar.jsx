"use client"

import Link from 'next/link'
import React from 'react'
import styles from "./navbar.module.css"
import { signOut, useSession } from 'next-auth/react'

const links = [
  {
    id: 1,
    title: "Home",
    url: "/"
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio"
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog"
  },
  {
    id: 4,
    title: "Contact",
    url: "/contact"
  },
  {
    id: 5 ,
    title: "Dashboard",
    url: "/dashboard"
  },
]



const Navbar = () => {
  const session = useSession();

  // Maybe add dashboard only if user = AvlanAz

  return (
    <div className="h-24 flex justify-between items-center">
      <Link href="/" className=" font-bold text-3xl">
        AV
      </Link>
      <div className="flex items-center gap-4">
        {links.map( (link) => (
          <Link key={link.id} href={link.url} className="">
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" &&
          <button
          className=" px-4 py-1 bg-sky-500 rounded-md"
          onClick={signOut}
          >
            Logout
          </button>}
      </div>
    </div>
  )
}

export default Navbar