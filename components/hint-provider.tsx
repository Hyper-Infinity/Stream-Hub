import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface HintProps {
    label: string,
    children: React.ReactNode,
    asChild?: boolean,
    side?: "top" | "bottom" | "left" | "right",
    align?: "start" | "center" | "end"
}

export function Hint({
    label,
    children,
    align,
    asChild,
    side
}: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="text-gray-900 bg-slate-200" side={side} align={align}>
                    <p className="font-semibold">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}