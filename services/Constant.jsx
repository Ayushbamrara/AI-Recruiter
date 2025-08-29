import { LayoutDashboard, Settings, Calendar, List, CreditCard } from "lucide-react";

export const SideBarOptions= [
    {
        name : "Dashboard",
        icon : LayoutDashboard,
        path :"/dashboard"
    },
    {
        name : "Scheduled Interview",
        icon : Calendar,
        path :"/scheduled-interview"
    },
    {
        name : "All Interview",
        icon : List,
        path :"/all-interview"
    },
    {
        name : "Billing",
        icon : CreditCard,
        path :"/billing"
    },
    {
        name : "Setting",
        icon : Settings,
        path :"/settings"
    },
]

export const InterviewType ={}