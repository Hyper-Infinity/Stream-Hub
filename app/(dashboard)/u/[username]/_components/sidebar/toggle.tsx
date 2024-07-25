"use client"

import { Hint } from "@/components/hint-provider";
import { Button } from "@/components/ui/button";
import { useCreatorSideBar } from "@/store/use-creator-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useCreatorSideBar((state) => state);
    const lable = collapsed ? "Expand" : "Collapse";
    return <>
        {collapsed ? <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
            <Hint label={lable} side="right" asChild>
                <Button
                    onClick={onExpand}
                    variant={"ghost"}
                    className="h-auto p-2"
                >
                    <ArrowRightFromLine className="h-4 w-4"/>
                </Button>
            </Hint>
        </div> : <div className="p-3 pl-6 md-2 hidden lg:flex items-center w-full">
            <p className="font-semibold text-primary">
                DashBoard
            </p>
            <Hint label={lable} side="right" asChild>
                <Button
                    onClick={onCollapse}
                    variant={"ghost"}  
                    className="h-auto p-2 ml-auto"
                >
                    <ArrowLeftFromLine className="h-4 w-4"/>
                </Button>
            </Hint>
        </div>}
    </>
}