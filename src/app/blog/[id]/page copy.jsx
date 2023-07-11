"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import Image from 'next/image';
import useSWR from "swr"

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    /* cache: "no-store", */
  });

  if (!res.ok) {
    return notFound
  }

  return res.json()
}



const Post = async ({params}) => {
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `http://localhost:3000/api/posts/${params.id}`,
    fetcher
  )

  console.log(data)

  const handleCommentSubmit = async (e, id) => {
    e.preventDefault();
    const content = e.target[0].value;

    try {
      await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({
          user: session.data.user.name,
          content,
        }),
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div></div>
    /* 
    <div class="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-xl">{data.desc}</p>
        <Image src={data.img} alt="" width="500" height="500" className='rounded-sm'/>
      </div>
      <p>{data.content}</p>

      <form className='COMMENTS-FORM' onSubmit={handleCommentSubmit}>
        <textarea placeholder='Comment'
          className=''
          cols="30"
          rows="10"
        ></textarea>

      </form>

      <h1>You need to be signed in to add comments</h1>

      <div className='#COMMENTS'>
        {data.comments.map( (comment) => (
          <div className='#COMMENT'>
            <h1 className='#USERNAME'>{comment.user}</h1>
            <p className='#CONTENT'>{comment.content}</p>
          </div>
        ))}
        
      </div>
    </div> */
  )
}

export default Post