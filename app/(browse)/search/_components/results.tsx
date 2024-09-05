import { getSearch } from "@/lib/search-service"
import { ResultCard, ResultCardSkeleton } from "./resultCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
    trem?: string
}

export const Results = async ({
    trem
}: ResultsProps) => {
    const data = await getSearch(trem);
    return <div>
        <h2 className="text-lg font-semibold mb-4">
            Results for term &quot;{trem}&quot;
        </h2>
        {data.length == 0 ? <p className="text-muted-foreground text-sm">
            No results found. Try searching for something else.
        </p> : <div className="flex flex-col gap-y-4">
            {data.map((result) => {
                return <div>
                    <ResultCard data={result} key={result.id}/>
                </div>
            })}
        </div>}
    </div>
}

export const ResultsSkeleton = () => {
    return <div>
        <Skeleton className="h-8 w-[290px] mb-4"/>
        <div className="flex-col space-y-4">
            {[...Array(4)].map((_, i) => {
                return <ResultCardSkeleton key={i}/>
            })}
        </div>
    </div>
}