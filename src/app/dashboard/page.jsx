"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from "./page.module.css"
import Image from 'next/image'
import useSWR from "swr"

const Dashboard = () => {
  const session = useSession()

  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    "/api/posts",
    fetcher
  )
  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch ("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title, 
          desc,
          img,
          content,
          isPublished: true,
          comments: [],
        })
      })
      mutate();
      e.target.reset();
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      mutate();
      
    } catch (err) {
      console.log(err)
    }
  }

  const handlePublish = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          isPublished: true,
        })
      })
      mutate();
    } catch (err) {
      console.log(err)
    }
  }

  const handleUnpublish = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          isPublished: false,
        })
      })
      mutate();
    } catch (err) {
      console.log(err)
    }
  }

  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login")
  }

  if (session.status === "authenticated") {
    return (
      <div className="flex gap-24">
        <div className="flex-1">
          {isLoading ? "Loading" : data.map((post) => (
            <div className="flex items-center justify-between mx-0 my-12" key={post._id}>
              <div className="relative w-60 h-60" >
                <Image src={post.img} alt="" fill className='rounded-md border-slate-50/[0.5] border-2 object-cover'/>
              </div>
              <h2 className="">{post.title}</h2>
              <span>
                {post.isPublished 
                  ?
                  // Unpublish button
                  <button className='p-2 bg-red-300 rounded-md text-slate-950' onClick={() => handleUnpublish(post._id)}>Unpublish</button>
                  :
                  // Publish button
                  <button className='p-2 bg-green-300 rounded-md text-slate-950' onClick={() => handlePublish(post._id)}>Publish</button>
                }
              </span>
              <span className="text-red-600 cursor-pointer" 
                onClick={() => handleDelete(post._id)}
              >X</span>
            </div>
          ))}

        </div>
        <form className="flex-1 flex flex-col gap-4 h-5/6 rounded-md bg-slate-50/[0.1] p-4 object-contain" onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className="p-2 bg-transparent rounded-sm text-slate-200 text-xl font-bold bottom-1" />
          <input type="text" placeholder="Desc" className="p-2 bg-transparent rounded-sm text-slate-200 text-xl font-bold bottom-1" />
          <input type="text" placeholder="Image" className="p-2 bg-transparent rounded-sm text-slate-200 text-xl font-bold bottom-1" />
          <textarea placeholder="Content"
           className="p-2 bg-transparent rounded-sm text-slate-50 text-xl font-bold bottom-1" 
           cols="30" 
           rows="10"
          ></textarea>
          <button className="p-2 bg-sky-500 rounded-md">Send Post</button>
        </form>
      </div>
    )
  }

  
}

export default Dashboard