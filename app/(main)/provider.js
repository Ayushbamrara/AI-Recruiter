import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSideBar } from './_component/AppSideBar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

const DashboardProvider = ({children}) => {
  return (
    <SidebarProvider className='bg-gray-100'>
        <AppSideBar />
        <div className='w-full p-10'>
        { /*<SidebarTrigger /> */ }
        <WelcomeContainer />
        {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider