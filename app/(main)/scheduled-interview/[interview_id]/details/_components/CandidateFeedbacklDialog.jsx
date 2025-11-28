import React from 'react'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress'


function CandidateFeedbacklDialog({candidate}) {
    const feedback = candidate?.feedback
    
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline' className="text-primary">View Report</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Feedback</DialogTitle>
      <DialogDescription asChild>
        <div>
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-5">
                    <h2 className='bg-primary font-bold text-white p-3 px-4.5 rounded-full'>{candidate?.userName[0]}</h2>
                        <div>
                            <h2 className='font-bold'>{candidate?.userName}</h2>
                            <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                        </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <h2 className='text-primary text-2xl font-bold'>6.5/10</h2>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='mt-5 font-bold text-md text-gray-700'>Skill Assesment</h2>
                <div className='mt-3 grid grid-cols-2 gap-10'>
                    <div>
                        <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/5</span> </h2>
                        <Progress value={feedback?.rating?.technicalSkills / 5 * 100} className='mt-1'/>
                    </div>
                    <div>
                        <h2 className='flex justify-between'>Communication Skills <span>{feedback?.rating?.communication}/5</span> </h2>
                        <Progress value={feedback?.rating?.communication / 5 * 100} className='mt-1'/>
                    </div>
                    <div>
                        <h2 className='flex justify-between'>Problem-solving Skills <span>{feedback?.rating?.problemSolving}/5</span> </h2>
                        <Progress value={feedback?.rating?.problemSolving / 5 * 100} className='mt-1'/>
                    </div>
                    <div>
                        <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience}/5</span> </h2>
                        <Progress value={feedback?.rating?.experience / 5 * 100} className='mt-1'/>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='font-bold'>Performance Summery</h2>
                <div className='p-5 bg-secondary my-3 rounded-md'>
                    {Array.isArray(feedback?.summary) ? feedback?.summary?.map((summary,index)=> (
                        <p key={index}>{summary}</p>
                    )): <p>{feedback?.summary}</p>}
                </div>
            </div>
            <div className={`p-5 mt-10 flex items-center justify-between rounded-md ${feedback.recommendation =='No' ? 'bg-red-100' : 'bg-green-100'}`}>
                <div>
                    <h2 className={` font-bold ${feedback?.recommendation=='No' ? 'text-red-700' : 'text-green-700'}`}>Recommendation Msg:</h2>
                    <p className={`${feedback?.recommendation=='No' ? 'text-red-500' : 'text-green-500'}`}>{feedback.recommendationMsg}</p>
                </div>
                <Button  className={`${feedback.recommendation =='No' ? 'bg-red-700' : 'bg-green-700'}`}>Send Msg</Button>
            </div>
        </div>
      </DialogDescription>
      
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default CandidateFeedbacklDialog