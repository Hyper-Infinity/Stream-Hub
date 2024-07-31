import { Check, UserIcon } from "lucide-react";
import { UserAvatar, UserAvatarSkeleton } from "../useravatar";
import { VarifiedMark } from "./varified";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";


interface HeaderProps {
    hostName: string;
    hostId: string;
    viewerName: string;
    imageUrl: string;
    name: string;
    isFollowing: boolean;
}

export const Header = ({
    hostId, 
    hostName, 
    imageUrl, 
    isFollowing, 
    name, 
    viewerName
}: HeaderProps) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostId);
    
    const isLive = !!participant;
    const participantsCount = participants.length - 1;

    const hostAsViewer = `host-${hostId}`;
    const isHost = viewerName === hostName;

    return <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-3">
            <UserAvatar imageUrl={imageUrl} userName={hostName} isLive={isLive} size={"lg"} showBadge/>
            <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                    <h2 className="text-lg font-semibold capitalize">
                        {hostName}
                    </h2>
                    <VarifiedMark />
                </div>
                <p className="text-xs pl-1 font-semibold">
                    {name}
                </p>
                {isLive ? <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                    <UserIcon className="h-4 w-4"/>
                    <p>
                        {participantsCount} {participantsCount <= 1 ? "Viewer" : "Viewers"}
                    </p>
                </div> : <div>
                    <p className="font-semibold pl-1 text-xs text-muted-foreground">
                        Offline
                    </p>
                </div>}
            </div>
        </div>
        <Actions 
            isFollowing={isFollowing}
            isHost={isHost}
            hostName={hostName}
            hostId={hostId}
        />
    </div>
}

export const HeaderSkeleton = () => {
    return <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-3">
            <UserAvatarSkeleton size={"lg"}/>
            <div className="space-y-2">
                <Skeleton className="h-6 w-32"/>
                <Skeleton className="h-4 w-24"/>
            </div>
        </div>
        <ActionsSkeleton />
    </div>
}