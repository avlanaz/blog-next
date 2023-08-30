"use client"

import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import styles from "./page.module.css"
import { useRouter } from 'next/navigation'

const Login = () => {
  const session = useSession()

  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "authenticated") {
    router.push("/dashboard")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email)
    console.log(password)
    signIn("credentials", {email, password})
  }

  const inputStyle = "p-6 bg-transparent border-2 border-solid border-slate-400 rounded-md font-bold text-slate-400"
  const buttonStyle = "w-80 p-4 cursor-pointer bg-sky-500 border-none rounded-md font-bold"

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <form className="w-80 flex flex-col gap-6" onSubmit={handleSubmit}>
        <input type='text' placeholder='email' className={inputStyle} required/>
        <input type='password' placeholder='password' className={inputStyle} required/>
        <button className={buttonStyle}>Login</button>
      </form>
      <button className={buttonStyle} onClick={() => signIn("google")}>Login with Google</button>
    </div>
  )
}

export default Login