"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Placeholder from "public/user_placeholder.png"
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
          {
            session.status === "unauthenticated" &&
            <Link 
              className=" px-4 py-1 bg-sky-500 rounded-md"
              href="/dashboard/login">
              Login
            </Link>
          }
          {
            // display register button if unauthenticated
            session.status === "unauthenticated" &&
            <Link
              className=" px-4 py-1 bg-sky-500 rounded-md"
              href="/dashboard/register">
              Register
            </Link>
          }
          {
            //display an image with blurred borders if the user is logged in
            session.status === "authenticated" &&
            <div className="relative w-12 h-12 rounded-full">
              <Image src={session.data.user.image || Placeholder} alt="" fill className="rounded-full object-cover"/>
            </div>
          }
          
      </div>
    </div>
  )
}

export default Navbar