"use client"

import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"
import { ToggleSkeleton } from "./toggle"
import { RecommendedSkeleton } from "./recommended"
import { useIsClient } from "usehooks-ts"
import { FollowingSkeleton } from "./following"

interface WrapperProps {
    children: React.ReactNode
} 

export const Wrapper = ({children}: WrapperProps) => {
    const isClient = useIsClient();
    const {collapsed} = useSidebar((state) => state);

    if(!isClient) {
        return <aside className="fixed flex flex-col w-[70px] lg:w-60 left-0 h-full bg-background border-r z-50 border-slate-700">
            <ToggleSkeleton/>
            <FollowingSkeleton/>
            <RecommendedSkeleton/>
        </aside>
    }

    return <aside 
        className={cn(
            "fixed flex flex-col w-60 left-0 h-full bg-background border-r z-50 border-slate-700",
            collapsed && "w-[70px]", 
        )}
    >
        {children}
    </aside>
}