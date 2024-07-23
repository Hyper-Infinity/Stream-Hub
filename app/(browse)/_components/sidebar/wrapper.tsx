"use client"

import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"

interface WrapperProps {
    children: React.ReactNode
} 

export const Wrapper = ({children}: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state);
    return <aside 
        className={cn(
            "fixed flex flex-col w-60 left-0 h-full bg-background border-r z-50 border-slate-700",
            collapsed && "w-[70px]", 
        )}
    >
        {children}
    </aside>
}