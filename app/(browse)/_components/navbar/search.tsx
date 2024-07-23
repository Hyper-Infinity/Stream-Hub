"use client"

import qs from "query-string";
import { FormEvent, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value) return;
        
        const url = qs.stringifyUrl({
            url:"/search",
            query: { term: value}
        }, {skipEmptyString: true})

        router.push(url);
    };

    const onClear = () => {
        setValue("");
    }

    return <form 
        onSubmit={onSubmitHandler}
        className="relative w-[280px] md:w-[300px] lg:w-[400px] flex items-center"
    >
        <Input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" 
            placeholder="Search"
        />
        {value === "" 
        ? <> </> 
        : <X
            onClick={onClear}
            className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        />}
        <Button 
            type="submit"
            variant={"secondary"}
            size={"sm"}
            className="rounded-l-none"
        >
            <SearchIcon className="h-5 w-5 text-muted-foreground"/>
        </Button>
    </form >
} 