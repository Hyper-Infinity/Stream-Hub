"use client"

import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    isFollowing: boolean,
    userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
    const [ispanding, startTransition] = useTransition();

    const onClickFollow = () => {
        if (!isFollowing) {
            startTransition(() => {
                onFollow(userId).then((data) => {
                    return toast.success(`You are now following ${data.following.userName} 🥳🥳`, { duration: 1500 })
                }).catch(() => {
                    return toast.error("Something went wrong 🤯🤯", { duration: 1500 })
                });
            })
        }
        else {
            console.log("hello");
            startTransition(() => {
                onUnfollow(userId).then((data) => {
                    return toast.success(`You Unfollowed ${data.following.userName} 😢😢`, { duration: 1500 })
                }).catch(() => {
                    return toast.error("Something went wrong 🤯🤯", { duration: 1500 })
                });
            })
        }
    }

    return <>
        <Button
            disabled={ispanding}
            variant={"primary"}
            onClick={onClickFollow}
        >
            {isFollowing ? "UnFollow" : "Follow"}
        </Button>
    </>
}