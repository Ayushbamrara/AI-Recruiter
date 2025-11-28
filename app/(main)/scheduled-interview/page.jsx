"use client"
import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabaseClient';
import React from 'react'
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import InterviewCard from '../dashboard/_components/InterviewCard';

function ScheduledInterview() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState();
    useEffect (()=>{
        user && GetInterviewList();
    },[user])
    const GetInterviewList = async() => {
        const result = await supabase.from('Interviews')
        .select('id, jobPosition, duration, interview_id, "interview-feedback"(userEmail)')
        .eq('userEmail', user?.email)
        .order('id',{ascending: false})
        console.log(result);
        setInterviewList(result.data);
    }

  return (
    <div>
        <h2 className='font-bold text-xl '>Interview List With Candidate Feedback</h2>
        {interviewList?.length == 0 && 
            <div className='flex flex-col items-center mt-5'>
                <Video className='h-10 w-10 text-primary' />
                <h2>You dont have any interview created</h2>
                <Link href={'/dashboard/create-interview'}>
                <Button className='mt-5'>Create new interview</Button>
                </Link>
                
            </div>
            }
            { interviewList && 
              <div className='grid grid-cols-2 mt-5 xl:grid-cols-2 gap-5'> 
                {interviewList?.map((interview,index) => (                
                <InterviewCard key={interview.id} interview={interview} index={index} viewDetail={true}/>
              ))}
              </div>
            }
    </div>
  )
}

export default ScheduledInterview;