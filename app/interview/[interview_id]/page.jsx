"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import InterviewHeader from '../_components/InterviewHeader'
import { Clock, Info, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { flightRouterStateSchema } from 'next/dist/server/app-render/types'
import { toast } from 'sonner'

function Interview() {
    const {interview_id} = useParams();
    console.log(interview_id)

    const [interviewData,setInterviewData] = useState();
    const [username,setUsername] = useState();
    const [loading,SetLoading] = useState(false);

    useEffect(()=>{
        interview_id && GetInterviewDetails();
    },[interview_id])

    const GetInterviewDetails = async() => {
        SetLoading(true)
        try {
        let { data: Interviews, error } = await supabase
        .from('interviews')
        .select("jobPosition ,jobDescription, duration , type")
        .eq('interview_id',interview_id)

        setInterviewData(Interviews[0])
        SetLoading(false)
        if(Interviews?.length == 0){
            toast('Incorrect Interview Link')
            return;
        }
        }
        catch(e){
            SetLoading(false)
            toast('Incorrect Interview Link')
        }

        console.log(Interviews);
    }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-7 '>
        <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52 mb-20'>
            <Image src={'/logo.png'} alt='logo' width={200} height={100} className='w-[140px]'/>

            <h2 className='mt-3'>AI-Powered Interview Platform</h2>

            <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-[250px] my-6'/>
            <h2 className='font-bold text-lg'>{interviewData?.jobPosition}</h2>
            <h2 className='flex gap-2 items-center text-gray-500'> <Clock className='h-4 w-4'/>{interviewData?.duration}</h2>
            <div className='w-full'>
                <h2>Enter your full name</h2>
                <Input placeholder='e.g. Ayush Bamrara' onChange={(event)=>setUsername(event.target.value)}/>
            </div>
            <div className='bg-blue-100 flex gap-4 rounded-lg p-3 mt-5'>
                <Info className='text-primary'/>
                <div>
                    <h2 className='font-bold'>Before you begin</h2>
                    <ul className='' >
                        <li className='text-sm text-primary'>- Test your camera and microphone</li>
                        <li className='text-sm text-primary'>- Make sure you have a stable internet connection</li>
                        <li className='text-sm text-primary'>- Find a quite place for interview</li>
                    </ul>
                </div>
            </div>
            <Button className={'mt-5 w-full font-bold'} disabled ={ loading || !username}> <Video/> Join interview</Button>
        </div>
    </div>
  )
}

export default Interview