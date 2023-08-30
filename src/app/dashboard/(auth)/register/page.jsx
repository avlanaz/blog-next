"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Register = async () => {
  const [err, setErr] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      })
      
      res.status === 201 && router.push("dashboard/login?success=Account has been created")
    } catch (err) {
      setErr(true)
    }
  }

  const inputStyle = "p-6 bg-transparent border-2 border-solid border-slate-400 rounded-md font-bold text-slate-400"
  const buttonStyle = "w-80 p-4 cursor-pointer bg-sky-500 border-none rounded-md font-bold"

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <form className="w-80 flex flex-col gap-6" onSubmit={handleSubmit}>
        <input type='text' placeholder='username' className={inputStyle} required/>
        <input type='text' placeholder='email' className={inputStyle} required/>
        <input type='password' placeholder='password' className={inputStyle} required/>
        <button className={buttonStyle}>Register</button>
      </form>
      {err && "Something went wrong!"}
      <Link href="/dashboard/login">Login with an existing account</Link>
    </div>
  )
}

export default Register