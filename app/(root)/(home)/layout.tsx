import React, { Children, ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video Calling App",
  icons:
  {
    icon: '/icons/logo.svg'
  }
};

const Home_layout = ({children} : {children: ReactNode}) => {
  return (
    <main className='relative'>
        <div className="flex">
            <Sidebar />
            <Navbar />
            <section className='flex flex-col w-full'>
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 text-white">
                <div className="w-full">
                   {children}
                </div>
            </section>
            </section>
        </div>
    </main>
  )
}

export default Home_layout
