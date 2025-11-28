"use client"
import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import moment from "moment";

function InterviewDetailContainer({interviewDetail}) {
  return (
    <div className='p-5 bg-white rounded-lg mt-5'>
        <h2 className='text-lg font-bold'>{interviewDetail?.jobPosition}</h2>
        <div className='mt-4 flex items-center justify-between'>
            <div className='mt-4'>
                <h2 className='text-sm text-gray-500 m'>Duration</h2>
                <h2 className='flex mt-1 font-bold text-md items-center gap-2'><Clock className='h-4 w-4'/>{interviewDetail?.duration}</h2>
            </div>
            <div className='mt-4'>
                <h2 className='text-sm text-gray-500 m'>Created On</h2>
                <h2 className='flex mt-1 font-bold text-md items-center gap-2'><Calendar className='h-4 w-4'/>{moment(interviewDetail?.created_at).format('MMM DD, yyy')}</h2>
            </div>
            {interviewDetail?.type && <div className='mt-4'>
                <h2 className='text-sm text-gray-500 m'>Type</h2>
                <h2 className='flex mt-1 font-bold text-md items-center gap-2 '><Clock className='h-4 w-4'/>{JSON.parse(interviewDetail?.type)?.[0]}</h2>
            </div> }
        </div>
        <div className='mt-5'>
            <h2 className='text-md font-bold text-gray-800 m'>Job Description</h2>
            <h2 className='flex mt-1 text-sm items-center leading-6 gap-2'>{interviewDetail?.jobDescription}</h2>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-bold text-gray-800 m'>Interview Questions</h2>
            <div className='grid grid-cols-2 gap-3 mt-3'>
                {interviewDetail?.questionList.map((item,index) => (
                    <h2 className='text-sm'>{index + 1}. {item?.question}</h2>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default InterviewDetailContainer