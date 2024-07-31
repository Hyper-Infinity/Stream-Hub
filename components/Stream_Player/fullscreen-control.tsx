"use client"

import {Maximize, Minimize} from "lucide-react"
import { Hint } from "../hint-provider"

interface FullScreenControlProps {
    isFullScreen: boolean, 
    onToggle: () => void
}

export const FullScreenControl = ({
    isFullScreen,
    onToggle
}: FullScreenControlProps) => {
    const Icon = isFullScreen ? Minimize : Maximize;
    const Label = isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen";

    return <div className="flex justify-center items-center gap-4">
        <Hint label={Label} asChild>
            <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
                <Icon className="h-5 w-5"/>
            </button>
        </Hint>
    </div>
}