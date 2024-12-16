import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <main className='flex justify-center w-full h-screen items-center'>
        <SignUp />
    </main>
  ) 
}

export default SignUpPage
