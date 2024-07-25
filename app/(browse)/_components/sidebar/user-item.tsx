import { User } from "@prisma/client"
import { Key } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/store/use-sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { UserAvatar } from "@/components/useravatar"
import { LiveBadge } from "@/components/liveBadge"

interface userItemProps {
    key: Key,
    user: User,
    isLive?: boolean
}

export const UserItem = ({ user, isLive }: userItemProps) => {
    const pathname = usePathname();
    const { collapsed } = useSidebar((state) => state);
    const href = `/${user.userName}`;
    const isActive = pathname === href;
    return <Button
        asChild
        variant={"ghost"}
        className={cn(
            "w-full h-12",
            collapsed ? "justify-center" : "justify-start",
            isActive && "bg-accent"
        )}
    >
        <Link href={href}>
            <div className={cn(
                "flex items-center w-full gap-x-4",
                collapsed && "justify-center"
            )}>
                <UserAvatar imageUrl={user.imageUrl} isLive={isLive} userName={user.userName} />
                {!collapsed && <p className="truncate">
                    {user.userName}
                </p>}
                {!collapsed && isLive && <LiveBadge className="ml-auto" />}
            </div>
        </Link>
    </Button >
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
}