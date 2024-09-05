"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string
}

export const UnblockButton = ({
    userId
}: UnblockButtonProps) => {
    const [isPanding, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
            .then((result) => toast.success(`User ${result.blocked.userName} Unblocked`))
            .catch(() => toast.error("Something went wrong !")); 
        })
    }

    return <Button
        variant={"outline"}
        disabled= {isPanding}
        onClick={onClick}
        size={"sm"}
        className="w-full text-blue-500"
    >
        Unblock
    </Button>
}