"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Hint } from "@/components/hint-provider";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
    const label = collapsed ? "Expand" : "Collapse";
    return <>
        {!collapsed ? <div className="p-3 pl-6 mb-2 flex items-center w-full">
            <p className="font-semibold text-primary">
                For you
            </p>
            <Hint label={label} side="right" asChild>
                <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant={"ghost"}>
                    <ArrowLeftFromLine className="h-4 w-4" />
                </Button>
            </Hint>
        </div> : <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
            <Hint label={label} side="right" asChild>
                <Button onClick={onExpand} className="h-auto p-2" variant={"ghost"}>
                    <ArrowRightFromLine className="h-4 w-4" />
                </Button>
            </Hint>
        </div>}
    </>
}

export const ToggleSkeleton = () => {
    return <>
        <div className="hidden lg:flex p-3 pl-6 mb-2 items-center w-full">
            <p className="font-semibold text-primary">
                For you
            </p>
            <Button className="h-auto p-2 ml-auto" variant={"ghost"}>
                <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
        </div>
    </>
}