import React from 'react'
import InterviewHeader from './_components/InterviewHeader'

function InterviewLayout ({children}) {
  return (
    <div className='bg-secondary'>
        <InterviewHeader />
        <div>{children}</div>
    </div>
  )
}

export default InterviewLayout