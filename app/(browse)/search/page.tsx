import { redirect } from "next/navigation"
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams: {
        term?: string
    }
}

const SearchPage = ({
    searchParams
}: SearchPageProps) => {
    let qurey;
    if(!searchParams.term) {
        redirect('/');
    }
    else {
        qurey = searchParams.term.trim();
        if(qurey.length == 0) {
            redirect('/');
        }
    }
    return <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <Suspense fallback={<ResultsSkeleton/>}>
            <Results trem={searchParams.term}/>
        </Suspense>
    </div>
}

export default SearchPage;