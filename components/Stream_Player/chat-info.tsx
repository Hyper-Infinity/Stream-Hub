"use client" 

import { useMemo } from "react"
import { Info } from "lucide-react"
import { Hint } from "../hint-provider"

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowerOnly: boolean;
}

export const ChatInfo = ({
    isDelayed, 
    isFollowerOnly
}: ChatInfoProps) => {
    const hint = useMemo(() => {
        if(isFollowerOnly && !isDelayed) {
            return "Only Followers Can Chat !";
        }
        if(isDelayed && !isFollowerOnly) {
            return "Messages Are Delayed By 3 Seconds";
        }
        if(isDelayed && isFollowerOnly) {
            return "Only Followers Can Chat & Messages Are Delayed By 3 Seconds";
        }
        return "";
    }, [isDelayed, isFollowerOnly]);

    const label = useMemo(() => {
        if(isFollowerOnly && !isDelayed) {
            return "Followers Only";
        }
        if(isDelayed && !isFollowerOnly) {
            return "Slow Mode";
        }
        if(isDelayed && isFollowerOnly) {
            return "Followers Only & Slow Mode";
        }
        return "";
    }, [isDelayed, isFollowerOnly]);

    if(!isDelayed && !isFollowerOnly) {
        return null;
    }

    return <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
        <Hint label={hint}>
            <Info className="h-4 w-4"/>
        </Hint>
        <p className="text-xs font-semibold">
            {label}
        </p>
    </div>
} 