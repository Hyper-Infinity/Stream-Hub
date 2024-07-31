"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow } from "@/actions/follow";
import { toast } from "sonner";
import { hostname } from "os";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    isFollowing: boolean;
    hostId: string;
    hostName: string;
    isHost: boolean;
}

export const Actions = ({
    hostId,
    isFollowing,
    isHost
}: ActionsProps) => {
    const [isPanding, startTransition] = useTransition();
    const router = useRouter();
    const { userId } = useAuth();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostId)
                .then(() => toast.success(`You are now following ${hostname} 🥳🥳`, { duration: 1500 }))
                .catch(() => toast.error("Something went wrong 🤯🤯", { duration: 1500 }));
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onFollow(hostId)
                .then(() => toast.success(`You Unfollowed ${hostname} 😢😢`, { duration: 1500 }))
                .catch(() => toast.error("Something went wrong 🤯🤯", { duration: 1500 }));
        });
    }

    const toggleFollow = () => {
        if (!userId) return router.push("/sign-in");

        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    return <Button
        disabled={isPanding || isHost}
        onClick={toggleFollow}
        variant={"primary"}
        className="w-full lg:w-auto"
    >
        <Heart className={cn(
            "h-4 w-4 mr-2",
            isFollowing ? "fill-white" : "fill-none"
        )} />
        {isFollowing ? "Unfollow" : "Follow"}
    </Button>
}

export const ActionsSkeleton = () => {
    return <Skeleton className="h-10 w-full lg:w-24"/>
}