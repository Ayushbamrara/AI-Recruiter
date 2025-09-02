import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink ( {interview_id, formData} ) {
    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
    const GetInterviewUrl = () => {
        return url
    }
    const onCopyLink = async()=>{
        await navigator.clipboard.writeText(url);
        toast("Link Copied")
    }
  return (
    <div className='flex flex-col items-center w-full justify-center mt-10'>
        <Image src={'/check.png'} alt='check'
        width={200} height={200} className='w-[50px] h-[50px]'
        />
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is ready !</h2>
        <p className='mt-3'>Share this link with your candidate to start the interview</p>
        <div className='w-full p-7 mt-6 bg-white rounded-lg'> 
            <div className='flex justify-between items-center'>
                <h2 className='font-bold'>Interview link:</h2>
                <h2 className='p-1 px-1 text-primary bg-blue-50 rounded-2xl'>Valid for 30 days</h2>
            </div>
            <div className='mt-5 flex gap-3 items-center'>
                <Input defaultValue={GetInterviewUrl()}  disabled={true}/>
                <Button onClick={()=>onCopyLink()}> <Copy/>Copy Link</Button>
            </div>
            <hr className='my-7'/>
            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/> {formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4'/> 10 Questions</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Calendar className='h-4 w-4'/> {formData?.duration}</h2>
            </div>
        </div>
        <div className='mt-7 bg-white p-5 rounded-lg w-full'>
            <h2>Share via</h2>
            <div className='flex gap-7 mt-5 '>
                <Button variant={'outline'} className=''> <Mail/> Email</Button>
                <Button variant={'outline'} className=''> <Mail /> Slack</Button>
                <Button variant={'outline'} className=''> <Mail /> Whatsapp</Button>
            </div>
        </div>
        <div className='w-full flex gap-5  justify-between mt-6'>
            <Link href={'/dashboard'}>
                <Button><ArrowLeft/> Back to dashboard</Button>
            </Link>
            <Link href={'/dashboard/create-interview'}>
                <Button><Plus/> Create new interview</Button>
            </Link>
            
            
        </div>
    </div>
  )
}

export default InterviewLink