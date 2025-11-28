"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/Provider';
import InterviewCard from '../dashboard/_components/InterviewCard';

function AllInterview() {
  const [interviewList , setInterviewList] = useState([]);
    const {user} = useUser();

    useEffect (()=>{
      user && getInterviewList();
    },[user])
    const getInterviewList = async () => {
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail', user?.email)
        .order('id',{ascending: false})
        console.log(Interviews)
        setInterviewList(Interviews);
      }
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'> All Previously Created Interview</h2>
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
                {interviewList.map((interview,index) => (                
                <InterviewCard key={interview.id} interview={interview} index={index}/>
              ))}
              </div>
            }
        
    </div>
  )
}

export default AllInterview;