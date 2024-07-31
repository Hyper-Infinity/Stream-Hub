"use client"

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { Hint } from "../hint-provider";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName: string;
    participantId: string;
}

export const CommunityItem = ({
    hostName, 
    participantId, 
    participantName, 
    viewerName
}: CommunityItemProps) => {
    const color = stringToColor(participantName);
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const [isPanding, startTransition] = useTransition();

    const handleBlock = () => {
        if(!participantName || isSelf || !isHost)   return;
        startTransition(() => {
            onBlock(participantId)
            .then(() => toast.success(`Blocked ${participantName}`, { duration: 1500 }))
            .catch(() => toast.error("Something went wrong 😬😬", { duration: 1500 }));
        })
    }

    return <div className={cn(
        "group flex justify-between items-center w-full p-2 rounded-md text-sm hover:bg-white/5", 
        isPanding && "opacity-50 pointer-events-none"
    )}>
        <p style={{color: color}}>
            {participantName}
        </p>
        {isHost && !isSelf && <Hint asChild label={"Block"}>
            <Button
                variant={"ghost"}
                disabled={isPanding}
                onClick={handleBlock}
                className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            >
                <MinusCircle className="h-4 w-4 text-muted-foreground"/>
            </Button>
        </Hint>} 
    </div>
}