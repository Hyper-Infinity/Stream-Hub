"use client"

import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"

interface RecommendedProps {
    data: User[]
}

export const Recommended = ({data}: RecommendedProps ) => {
    const {collapsed} = useSidebar((state) => state);
    const showListFlag = !collapsed && data.length > 0;

    return <div>
        {showListFlag ? <div className="pl-6 mb-4">
            <p className="text-sm text-muted-foreground">
                Recommended
            </p>
        </div> : <> 
            
        </>}
        <ul className="space-y-2 px-2">
            {data.map((user) => {
                return <UserItem key={user.id} user={user} isLive={true}/>
            })}
        </ul>
    </div>
}

export const RecommendedSkeleton = () => {
    return <ul className="px-2">
        {[...Array(3)].map((_, ind) => {
            return <UserItemSkeleton key={ind}/>
        })} 
    </ul>
}