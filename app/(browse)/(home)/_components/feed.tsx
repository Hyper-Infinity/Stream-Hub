import { getStreams } from "@/lib/feed-service"
import { StreamCard, StreamCardSkeleton } from "./streamCard";
import { Skeleton } from "@/components/ui/skeleton";

export const Feed = async () => {
    const data = await getStreams();
    return <div>
        <h2 className="text-lg font-semibold mb-4">
            Streams we think you&apos;ll like
        </h2>
        {data.length === 0 && (
            <div className="text-muted-foreground text-sm">No streams found.</div>
        )}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {data.map((result) => (
                <StreamCard key={result.id} data={result} />
            ))}
        </div>
    </div>
}

export const FeedSkeleton = () => {
    return <div>
        <Skeleton className="h-8 w-[290px] mb-4" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {[...Array(4)].map((_, i) => (
                <StreamCardSkeleton key={i} />
            ))}
        </div>
    </div>
}