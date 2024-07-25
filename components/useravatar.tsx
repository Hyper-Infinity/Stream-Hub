import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "./ui/avatar"
import { LiveBadge } from "./liveBadge"

const AvatarSizes = cva("", {
    variants: {
        size: {
            default: "h-8 w-8",
            lg: "h-14 w-14"
        }
    },
    defaultVariants: {
        size: "default"
    }
})

interface UserAvatarProps extends VariantProps<typeof AvatarSizes> {
    imageUrl: string,
    userName: string,
    isLive?: boolean,
    showBadge?: boolean
}

export const UserAvatar = ({
    imageUrl,
    isLive,
    userName,
    showBadge,
    size 
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;
    return <div className="relative">
        <Avatar
            className={cn(
                isLive && "ring-2 ring-rose-500 border border-background",
                AvatarSizes({size})
            )}
        >
            <AvatarImage src={imageUrl} className="object-cover"/>
            <AvatarFallback>
                {userName[0].toUpperCase()}
                {userName[userName.length - 1].toUpperCase()}
            </AvatarFallback>
        </Avatar>
        {canShowBadge && <div className="absolute -bottom-3 right-1/2 transform translate-x-1/2">
            <LiveBadge/>
        </div>}
    </div>
}

interface UserAvatarSkeletonProps extends VariantProps<typeof AvatarSizes> {};

export const UserAvatarSkeleton = ({size}: UserAvatarSkeletonProps) => {
    return <Skeleton className={cn(
        "rounded-full",
        AvatarSizes({size})
    )}/>
};