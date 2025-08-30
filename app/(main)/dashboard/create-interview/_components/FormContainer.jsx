import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState , useEffect} from 'react'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constant'
import { ArrowRight, TypeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FormContainer ({onHandleInputChange , GoToNext})  {

  const [interviewType, setInterviewType] = useState([]);
  useEffect(()=>{
    if(interviewType){
      onHandleInputChange('type', interviewType)
    }
  },[interviewType])
  
  const AddInterviewType = (type) => {
    const data = interviewType.includes(type)
    if(!data){
      setInterviewType(prev=>[...prev, type])
    } else {
      const result = interviewType.filter(item => item!=type);
      setInterviewType(result);
    }
  }

  return (
    <div className='p-5 bg-white rounded-2xl'>
        <div>
            <h2 className='text-sm font-medium'>Job Position</h2>
            <Input placeholder="eg. Fullstack developer" className='mt-2' 
            onChange ={(event)=>onHandleInputChange('jobPosition' , event.target.value)}
            />
        </div>
        <div className='mt-5 '>
            <h2 className='text-sm font-medium'>Job Description</h2>
            <Textarea placeholder="Enter details job description" className='h-[200px] mt-2' 
            onChange ={(event)=>onHandleInputChange('jobDescription' , event.target.value)}
            />
        </div>
        <div className='mt-5 '>
            <h2 className='text-sm font-medium'>Interview Duration</h2>
            <Select onValueChange = {(value)=> onHandleInputChange('duration' , value)}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30 Min">30 Min</SelectItem>
                    <SelectItem value="45 Min">45 Min</SelectItem>
                    <SelectItem value="60 Min">60 Min</SelectItem>
              </SelectContent>
            </Select>
        </div>
        <div className='mt-5'>
          <h2 className='text-sm font-medium'>Interview type</h2>
          <div className='flex gap-3 flex-wrap mt-2'>
            {InterviewType.map((type,index) => (

              <div key={index} className={`flex gap-2 items-center cursor-pointer p-1 px-2 bg-white rounded-2xl border border-gray-300 hover:bg-secondary
                ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'} `} 
              onClick ={()=>AddInterviewType(type.title)}
              >
                
                <type.icon className='w-4 h-4' />
                <span>{type.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
          <Button>Generate questions <ArrowRight/></Button>
        </div>
    </div>
  )
}

export default FormContainer