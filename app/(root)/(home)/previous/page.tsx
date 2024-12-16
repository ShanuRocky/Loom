import CallList from '@/components/CallList'
import Loader from '@/components/Loader'
import React, { Suspense } from 'react'

const Previous = () => {
  return (
    <section className='flex flex-col size-full gap-5 text-white'>
      <h1 className='text-3xl font-bold'>Previous</h1>
      <Suspense fallback={<Loader />}>
      <CallList 
        type='previous'
        />
        </Suspense>
    </section>
  )
}

export default Previous
