"use client"
import { useUser } from '@/app/Provider'
import React from 'react'
import Image from 'next/image'

const WelcomeContainer = () => {
    const { user } = useUser();
  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
        <div >
            <h2 className='text-lg font-bold'>Welcome back, {user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interview, Hassel-Free Hiring</h2>
        </div>
        {user && <Image src={user.picture} alt = "userAvatar" width={50} height={50} className='rounded-full' />}
    </div>
  )
}

export default WelcomeContainer