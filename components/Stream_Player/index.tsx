"use client"

import { LiveKitRoom } from "@livekit/components-react"


import { Stream, User } from "@prisma/client"
import { cn } from "@/lib/utils"

import { Video, VideoSkeleton } from "./video"
import { useViewerToken } from "@/hooks/viewer-token-hook"
import { useChatSideBar } from "@/store/use-chat-sidebar"
import { Chat, ChatSkeleton } from "./chat"
import { ChatToggle } from "./chat-toggle"
import { Header, HeaderSkeleton } from "./header"
import { InfoCard } from "./info-card"
import { AboutCard } from "./about-card"


interface StreamPlayerProps {
    user: User & { 
        stream: Stream | null, 
        _count: {followedBy: number}
    },
    stream: Stream,
    isFollowing: boolean
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) => {
    const { token, name, indentity } = useViewerToken(user.id);
    const { collapsed } = useChatSideBar((state) => state);

    if (!token || !name || !indentity) {
        return <StreamPlayerSkeleton />
    }

    return <>
        {collapsed && <div className="hidden lg:block fixed top-[100px] right-2 z-50">
            <ChatToggle />
        </div>}
        <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WC_URL}
            className={cn(
                "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
            )}
        >
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <Video hostName={user.userName} hostId={user.id} />
                <Header 
                    hostName={user.userName}
                    hostId={user.id}
                    viewerName={name}
                    imageUrl={user.imageUrl}
                    isFollowing={isFollowing}
                    name={stream.name}
                />
                <InfoCard 
                    hostId={user.id}
                    hostName={user.userName}
                    viewerName={name}
                    name={stream.name}
                    thumbnailUrl={stream.thumbnailUrl}
                />
                <AboutCard 
                    hostName={user.userName}
                    hostId={user.id}
                    viewerName={name}
                    bio={user.bio}
                    followedByCount={user._count.followedBy}
                />
            </div>
            <div className={cn(
                "col-span-1",
                collapsed && "hidden"
            )}>
                <Chat
                    viewerName={name}
                    hostName={user.userName}
                    hostId={user.id}
                    isFollowing={isFollowing}
                    isChatEnabled={stream.isChatEnabled}
                    isChatDelayed={stream.isChatDelayed}
                    isChatFollowerOnly={stream.isChatFollowerOnly}
                />
            </div>
        </LiveKitRoom>
    </>
}

export const StreamPlayerSkeleton = () => {
    return <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
            <VideoSkeleton />
            <HeaderSkeleton />
        </div>
        <div className="col-span-1 bg-background">
            <ChatSkeleton />
        </div>
    </div>
}