"use client"
import Image from 'next/image'
import  Link  from 'next/link';
import {SideBarOptions} from "@/services/Constant"
import { Plus } from "lucide-react";
import { Button }  from '@/components/ui/button'
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function AppSideBar() {
  return (
    <Sidebar >
      <SidebarHeader className="flex items-center mt-5">
        <Image src={'/logo.png'} alt='logo' width = {150} height = {100}className="[w-100px]" />
        <Button className="w-full mt-5"> <Plus /> Create new interview</Button>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SideBarOptions.map((option, index)=> {
                        const path = usePathname();
                        console.log(path); 
                        const Icon = option.icon;
                        return (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild  className={`p-5 ${path == option.path && 'bg-blue-100'}`}>
                                <Link href={option.path}>
                                    <Icon className={`w-4 h-2 mr-4 ${path == option.path && 'text-primary'}`} />
                                    <span className={`text-[16px] font-medium ${path == option.path && 'text-primary'}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}