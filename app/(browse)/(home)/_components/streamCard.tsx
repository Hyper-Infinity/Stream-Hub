import React from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { UserAvatar, UserAvatarSkeleton } from "@/components/useravatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";

export function StreamCard({
    data,
}: {
    data: {
        user: User;
        isLive: boolean;
        name: string;
        thumbnailUrl: string | null;
    };
}) {
    return (
        <Link href={`/${data.user.userName}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail
                    src={data.thumbnailUrl}
                    fallback={data.user.imageUrl}
                    isLive={data.isLive}
                    username={data.user.userName}
                />
                <div className="flex gap-x-3">
                    <UserAvatar
                        userName={data.user.userName}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />
                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font-semibold hover:text-blue-500">
                            {data.name}
                        </p>
                        <p className="text-muted-foreground">{data.user.userName}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function StreamCardSkeleton() {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
    );
}