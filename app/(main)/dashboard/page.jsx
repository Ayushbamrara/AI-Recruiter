import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewLists from './_components/LatestInterviewLists'

const Dashboard = () => {
  return (
    <div>
        { /*<WelcomeContainer /> */}
        <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
        <CreateOptions />
        <LatestInterviewLists />

    </div>
  )
}

export default Dashboard