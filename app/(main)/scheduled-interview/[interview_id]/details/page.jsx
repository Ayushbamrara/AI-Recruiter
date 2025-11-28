"use client"
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient';
import React, { useEffect, useState } from 'react'
import { useUser } from '@/app/Provider';
import InterviewDetailContainer from './InterviewDetailContainer';
import CandidateList from './_components/CandidateList';
import CandidateFeedbacklDialog from './_components/CandidateFeedbacklDialog';

function InterviewDetail() {
    const {interview_id} = useParams();
    const [interviewDetail, setInterviewDetail] = useState();
    const {user} = useUser()

    useEffect (() => {
        user && GetInterviewDetail();
    }, [user])

    const GetInterviewDetail = async() => {
        const result = await supabase.from('Interviews')
        .select(`id, jobPosition,jobDescription, type, questionList, duration, interview_id,created_at,
            interview-feedback(userEmail,userName,feedback,created_at)`)
        .eq('userEmail', user?.email)
        .eq('interview_id',interview_id)
        setInterviewDetail(result.data[0]);
    }

  return (
    <div>
        <h2 className='mt-5 font-bold'>Interview detail</h2>
        <InterviewDetailContainer interviewDetail={interviewDetail}/>
        <CandidateList candidateList={interviewDetail?.['interview-feedback']}/>
        
    </div>
  )
}

export default InterviewDetail