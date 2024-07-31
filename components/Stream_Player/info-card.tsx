"use client"

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { EditInfo } from "./edit-info";

interface InfoCardProps {
    hostId: string;
    hostName: string;
    viewerName: string;
    thumbnailUrl: string | null;
    name: string;
}

export const InfoCard = ({
    hostId, 
    hostName, 
    name, 
    thumbnailUrl, 
    viewerName
}: InfoCardProps) => {
    const hostAsViewer = `host-${hostId}`
    const isHost = viewerName === hostName;

    if(!isHost) return null;

    return <div className="px-4 border-t pt-4">
        <div className="rounded-xl bg-background">
            <div className="flex items-center gap-x-2.5 p-4">
                <div className="rounded-md bg-cyan-700 p-2 h-auto w-auto">
                    <Pencil className="h-5 w-5"/>
                </div>
                <div>
                    <h2 className="text-sm lg:text-lg font-semibold capitalize">
                        Edit Your Stream Info
                    </h2>
                    <p className="text-muted-foreground text-xs lg:text-sm">
                        Maximize your visibility
                    </p>
                </div>
                <EditInfo 
                    initialName={name}
                    initialThumbnailUrl={thumbnailUrl}
                />
            </div>
            <Separator />
            <div className="p-4 lg:p-6 space-y-4">
                <div>
                    <h3 className="text-sm text-muted-foreground mb-2">
                        Name
                    </h3>
                    <p className="text-sm font-semibold capitalize">
                        {name}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground mb-2">
                        Thumbnail-URL
                    </h3>
                    {thumbnailUrl && <div className="relative aspect-video rounded-md overflow-hidden border border-white/10">
                        <Image 
                            fill
                            className="object-cover"
                            src={thumbnailUrl}
                            alt={name}
                        />
                    </div>}
                </div>
            </div>
        </div>
    </div>
}