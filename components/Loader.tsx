import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='flex-center h-screen w-full mt-0'>
       <Image 
           src='/icons/loading-circle.svg'
           alt='loading'
           width={50}
           height={50}
           loading='eager'
       />
    </div>
  )
}

export default Loader
