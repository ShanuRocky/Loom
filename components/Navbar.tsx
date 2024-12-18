import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import {SignedIn,UserButton } from '@clerk/nextjs'


const Navbar = () => {
  return (
    <nav className='flex-between z-50 fixed w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1 w-fit'>
        <Image src="/icons/logo.svg" width={32} height={32} alt='YOOM LOGO' className='max-sm:size-10' loading='eager' />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>YOOM</p>
      </Link>

      <div className='flex-between gap-5 w-fit'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>

    </nav>
  )
}

export default Navbar
