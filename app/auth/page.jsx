"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import React from 'react'
import { supabase } from '@/services/supabaseClient'
import { HandHeart } from 'lucide-react'


function Login () {

  // Here We used To sign in with google ..

  const signInWithGoogle = async ()  => {
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
    }
  });
    
    if(error){
      console.error("Error : ", error.message)
    }
  }

  return (
    <div className = 'flex flex-col justify-center items-center h-screen'>
      <div className = 'flex flex-col items-center border rounded-2xl p-8'>
        <Image src = {'/logo.png'} alt = "logo"   width = {100} height = {100} className = 'w-[180px] mb-2' />
        <div className='flex items-center flex-col '>
          <Image src = {'/login.png'} alt = {'login'} width = {600} height = {400} className = 'w-[400px] h=[250px] rounded-2xl' />
          <h2 className="text-2xl font-bold mt-5 ">Welcome to AiCruiter</h2>
          <p className="text-gray-500">Sign-in with google authentication</p>
          <Button className='mt-7 w-full' onClick = {signInWithGoogle} >Login with google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;