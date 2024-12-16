'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils";
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { sidebarLinks } from '@/constants'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-fit'>
            <Sheet>
                <SheetTrigger asChild >
                    <Image src='/icons/hamburger.svg' width={36} height={36} alt='hamberger icon'
                        className='cursor-pointer sm:hidden w-fit'>
                    </Image>
                </SheetTrigger>
                <SheetContent side="left" className='border-none bg-dark-1 w-fit'>
                    <Link href="/" className='flex items-center gap-1 w-fit'>
                        <Image src="/icons/logo.svg" width={32} height={32} alt='YOOM LOGO' className='max-sm:size-10' />
                        <p className='text-[26px] font-extrabold text-white '>YOOM</p>
                    </Link>

                    <section
                        className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between 
                        bg-dark-1 p-2 pt-20 text-white"
                    >
                        <div className="flex flex-col gap-6">
                            {
                                sidebarLinks.map((link) => {
                                    const isActive = (pathname === link.route) || (pathname.toString !== ("/").toString && pathname.startsWith(link.route));
                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start ',
                                                    { 'bg-blue-1': isActive, })}
                                            >
                                                <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                                                <p className="text-lg font-semibold ">
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })
                            }
                        </div>
                    </section>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav
