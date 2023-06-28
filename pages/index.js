import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import SideBar from '@/components/SideBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <main className='flex min-h-screen max w-7xl mx-auto bg-red-100'>
        {/* SideBar */}
        <div>
          <SideBar></SideBar>
        </div>

        {/* Home */}
        {/* Widgets */}
      </main>
  )
}
