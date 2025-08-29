"use client"
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const LatestInterviewLists = () => {
    const [interviewList , setInterviewList] = useState([]);
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>Previously Created Interview</h2>
        {interviewList?.length == 0 && 
            <div className='flex flex-col items-center mt-5'>
                <Video className='h-10 w-10 text-primary' />
                <h2>You dont have any interview created</h2>
                <Button className='mt-5'>Create new interview</Button>
            </div>
        }
    </div>
  )
}

export default LatestInterviewLists