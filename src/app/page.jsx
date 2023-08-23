import Image from "next/image"
import Link from "next/link"
import Hero from "public/hero.jpg"

export const metadata = {
  title: 'Next.js',
}

export default function Home() {

  return (
    <div className="flex gap-24 items-center">
      <div className="gap-12 flex-1 flex flex-col">
        <h1 className="font-bold text-6xl bg-gradient-to-b from-sky-500 to-gray-300 bg-clip-text text-transparent">Building better products</h1>
        <p className="text-2xl font-light">
          Helping you realise your ideas
        </p>
        <button className="p-4 rounded border-0 bg-sky-500 w-max cursor-pointer">
          <Link href="/portfolio">See my works</Link>
          </button>
      </div>
      <div className="gap-12 flex-1 flex flex-col">
        <Image src={Hero} alt="hero" className="w-full h-96 object-cover rounded-md" />
      </div>
    </div>
  )
}