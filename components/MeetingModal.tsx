import React, { ReactNode } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'

interface MeetingModalProp {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    children?: ReactNode,

    handleClick?: () => void,
    buttonText?: string
    image?: string,
    buttonIcon?: string
}

const MeetingModal = ({ isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon }:
    MeetingModalProp
) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white m-4'>
                <div className='flex flex-col gap-6 '>
                    {
                        image && 
                        (
                            <div className='flex justify-center'>
                                <Image src={image} alt='image' width={72} height={72} loading='eager'
                                />
                            </div>
                        )
                    }
                    <h1 className={cn('font-bold text-3xl leading-[42px]' , className)}>{title}</h1>
                    {children}
                    <Button className='bg-blue-1 focus-visible:ring-0 rounded focus-visible:ring-offset-0 hover:bg-blue-1'
                            onClick={handleClick}>
                        {
                            buttonIcon && (
                                <Image  src={buttonIcon} alt='button icon' width={13} height={13} loading='eager'/>
                            )
                        }&nbsp;
                        {buttonText || 'schedule-meeting'} 
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal
