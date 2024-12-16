import React from 'react'
import Image from 'next/image'
import MeetingTypeList from '@/components/MeetingTypeList'
import { useCall } from '@stream-io/video-react-sdk'


const Home = () => {
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <section className='relative w-full h-[25vh] sm:h-[35vh]'>
        <Image src="/images/hero-background.png"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        ></Image>
        <div className="absolute top-0 left-0 w-full h-full">
          <h2 className="text-white text-[2.5vh] px-[1vh] font-thin m-[3vh] w-fit h-fit sm:text-[3.5vh] sm:m-[4vh] bg-[#FFFFFF0D]">
            Upcoming Meeting at: 12:30
          </h2>
          <div className='m-[3vh] pt-[2vh] w-fit h-fit sm:m-[4vh] sm:pt-[4vh]'> 
             <p className='text-[4vh] font-bold sm:text-[6vh]'>12:04</p>
             <p>Friday, 29 March 2024</p>   
          </div>
        </div>
      </section>
      <MeetingTypeList />
    </section>
  )
}

export default Home
