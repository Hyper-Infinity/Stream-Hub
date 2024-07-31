"use client"

import { ConnectionState, Track } from "livekit-client"
import {
    useConnectionState, 
    useRemoteParticipant, 
    useTracks
} from "@livekit/components-react"
import { OfflineVideo } from "./offline_video"
import { LoadingVideo } from "./loading_video"
import { LiveVideo } from "./live-video"
import { Skeleton } from "../ui/skeleton"

interface VideoProps {
    hostName: string,
    hostId: string
}

export const Video = ({
    hostId, 
    hostName
}: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostId);
    const tracks = useTracks([
        Track.Source.Camera, 
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostId);

    let content;

    if(!participant && connectionState == ConnectionState.Connected) {
        content = <OfflineVideo username={hostName}/>
    } else if(!participant || tracks.length == 0) {
        content = <LoadingVideo label={connectionState}/>
    } else {
        content = <LiveVideo participant={participant}/>
    }

    return <div className="aspect-video border-b group relative">
        {content}
    </div>
}

export const VideoSkeleton = () => {
    return <div className="aspect-video border-background border-x">
        <Skeleton className="h-full w-full rounded-none"/>
    </div>
}