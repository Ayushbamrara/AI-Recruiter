import React from 'react'

export const QuestionListConatiner = ({questionList}) => {
  return (
    <div>
        <h2 className='font-bold text-lg mb-5'>Generated Interview Questions:</h2>
            <div className='p-5 border border-gray-500 rounded-2xl bg-white'>
                {questionList.map((item,index)=>(
                    <div key={index} className='p-3 border border-gray-200 rounded-2xl mb-3'>
                        <h2 className='font-medium'>{item.question}</h2>
                        <h2 className='text-sm text-primary'>Type : {item?.type}</h2>
                    </div>  
                ))}
            </div>
    </div>
  )
}
