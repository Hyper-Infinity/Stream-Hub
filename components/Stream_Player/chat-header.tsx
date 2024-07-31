"use client"

import { Skeleton } from "../ui/skeleton"
import { ChatToggle } from "./chat-toggle"
import { VarientToggle } from "./varient-toggle"

export const ChatHeader = () => {
    return <div className="relative p-3 border-b">
        <div className="absolute left-2 top-2 hidden lg:block">
            <ChatToggle />
        </div>
        <p className="font-semibold text-center text-primary">
            Stream Chat
        </p>
        <div className="absolute right-2 top-2">
            <VarientToggle />
        </div>
    </div>
}

export const ChatHeaderSkeleton = () => {
    return <div className="relative border-b p-3 hidden md:block">
        <Skeleton className="absolute h-6 w-6 left-3 top-3" />
        <Skeleton className="h-6 w-28 mx-auto" />
    </div>
}