import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import CandidateFeedbacklDialog from './CandidateFeedbacklDialog'

function CandidateList({ candidateList =[] }) {
  return (
    <div>
        <h2 className='font-bold my-5'>Candidates ({candidateList?.length})</h2>
        {candidateList?.map((candidate, index) =>(
            <div key={index} className='p-5 flex gap-3 justify-between items-center bg-white rounded-lg'>
                <div className="flex items-center gap-5">
                    <h2 className='bg-primary font-bold text-white p-3 px-4.5 rounded-full'>{candidate?.userName[0]}</h2>
                    <div>
                        <h2 className='font-bold'>{candidate?.userName}</h2>
                        <h2 className='text-sm text-gray-500'>Completed On : {moment(candidate?.created_at).format('MMM DD, yyy')}</h2>
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <h2 className='text-green-500'>6.5/10</h2>
                    <CandidateFeedbacklDialog candidate={candidate} />
                </div>
            </div>
        ))}
    </div>
  )
}

export default CandidateList