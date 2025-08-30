import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { QuestionListConatiner } from './QuestionListConatiner';

function QuestionList({formData}) {
    
    const [loading, setLoading] = useState(false)
    const [questionList, setQuestionsList] = useState()


    useEffect(()=>{
        if(formData){
          //  GenerateQuestionList();
        }
    }, [formData])

    const GenerateQuestionList = async()=> {
        setLoading(true)
        try {
        const result = await axios.post('/api/ai-model', {
            ...formData
        })
        console.log(result.data.content)
        const Content = result.data.content
        const FINAL_CONTENT = Content.replace('```json','').replace('```','')
        setQuestionsList(JSON.parse(FINAL_CONTENT)?.interviewQuestions)
        setLoading(false)
        }
        catch(e){
            toast('Server Error Try Again !!')
            setLoading(false)
        }
    }

    const onFinish = () => {

    }
  return (
    <div>
        {loading && <div className='p-5 bg-blue-50 rounded-2xl border border-primary flex gap-5 items-center'>
            <Loader2Icon className='animate-spin'/>
            <div>
                <h2 className=' font-medium'>Generating interview question</h2>
                <p className='text-primary'>Our ai is crafting personalized question according to job description</p>
            </div>
        </div>
        }
        {questionList?.length>0 &&
        <div>
            <QuestionListConatiner questionList={questionList}/>
        </div>
        }
        <div className='flex justify-end mt-10'>
            <Button onClick={() => onFinish()}>Finish</Button>
        </div>
    </div>
  )
}

export default QuestionList