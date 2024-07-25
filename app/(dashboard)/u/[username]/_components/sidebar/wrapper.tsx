"use client"

import { cn } from "@/lib/utils"
import { useCreatorSideBar } from "@/store/use-creator-sidebar"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({children}: WrapperProps) => {
    
    const {collapsed} = useCreatorSideBar((state) => state);

    return <aside className={cn(
        "fixed flex flex-col w-[70px] lg:w-60 left-0 h-full bg-background border-r z-50 border-slate-700", 
        collapsed && "lg:w-[70px]", 
    )}> 
        {children}
    </aside>
}