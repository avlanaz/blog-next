import React from 'react'
import Image from 'next/image'
import ContactImg from "public/contact_img.jpg"
import Link from 'next/link'

const Contact = () => {
  return (
    <div>
      <h1 className=' font-bold text-6xl mb-24 text-center'>Contact me!</h1>
      <div className='#CONTAINER flex gap-12'>
        <div className='#IMG-CONTAINER flex-1'>
          <Image src={ContactImg} alt="hero" className="object-cover rounded-md" />
        </div>
        <form className='flex flex-col gap-6 flex-1'>
          <input type='string' placeholder='name' className=' p-4 bg-transparent text-slate-50 border-slate-50/[0.5] border-2'></input>
          <input type='string' placeholder='email' className=' p-4 bg-transparent text-slate-50 border-slate-50/[0.5] border-2'></input>
          <textarea 
            className=' p-4 bg-transparent text-slate-50 border-slate-50/[0.5] border-2'
            placeholder='message'
            cols={30}
            rows={10}
            ></textarea>
            <button className='w-1/4 text-center p-4 rounded-md'>
              <Link href="#">Send</Link>
            </button>
        </form>
      </div>
    </div>
  )
}

export default Contact