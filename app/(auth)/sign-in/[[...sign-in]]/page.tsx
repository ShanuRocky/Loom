import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <main className='flex justify-center w-full h-screen items-center'>
        <SignIn />
    </main>
  ) 
}

export default SignInPage
