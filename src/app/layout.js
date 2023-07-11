
import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AV Blog',
  description: 'Blog for my thoughts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " text-slate-50 bg-slate-950 overflow-x-hidden max-w-full"}>
        <AuthProvider>
          <div className="container">
            <Navbar/>
            { children }
            <Footer/>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
