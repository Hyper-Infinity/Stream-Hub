"use client"

import { BioModal } from "./bio-modal";
import { VarifiedMark } from "./varified";

interface AboutCardProps {
    hostId: string;
    hostName: string;
    viewerName: string;
    bio: string | null;
    followedByCount: number;
}

export const AboutCard = ({
    bio,
    followedByCount,
    hostId,
    hostName,
    viewerName,
}: AboutCardProps) => {
    const hostAsViewer = `host-${hostId}`;
    const isHost = hostName === viewerName;
    const followedByLable = followedByCount <= 1 ? "Follower" : "Followers";

    return <div className="px-4">
        <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                    About {hostName}
                    <VarifiedMark />
                </div>
                {isHost && <BioModal initialValue={bio} />}
            </div>
            <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{followedByCount}</span>{" "}
                {followedByLable}
            </div>
            <p className="text-sm">
                {bio || "This user prefers to keep an air of mystery about them."}
            </p>
        </div>
    </div>
}