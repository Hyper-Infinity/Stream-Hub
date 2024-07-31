"use client"

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"

interface followingProps {
    data: (Follow & { following: User & {stream: {isLive: boolean} | null} })[]
}

export const Following = ({ data }: followingProps) => {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) {
        return null;
    }

    return <div>
        {!collapsed && <div className="pl-6 mb-4">
            <p className="text-sm text-muted-foreground">
                Following
            </p>
        </div>}
        <ul className="space-y-2 px-2">
            {data.map((follow, ind) => {
                return <UserItem key={follow.following.id} user={follow.following} isLive={follow.following.stream?.isLive} />
            })}
        </ul>
    </div>
}

export const FollowingSkeleton = () => {
    return <div className="space-y-2 px-2">
        <ul>
            {[...Array(3)].map((_, i) => {
                return <UserItemSkeleton key={i} />
            })}
        </ul>
    </div>
}