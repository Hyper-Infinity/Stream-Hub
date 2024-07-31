"use client"

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copyButton";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface keyCardProps {
    value: string | null;
}

export const KeyCard = ({
    value
}: keyCardProps) => {
    const [isShow, setIsShow] = useState(false);

    const onclickForEye = () => {
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 1000);
    }

    return <div className="rounded-xl bg-gray-800 p-6">
        <div className="flex items-center gap-x-10">
            <p className="font-semibold shrink-0">
                Server Key :
            </p>
            <div className="space-y-2 w-full">
                <div className="w-full flex items-center gap-x-2">
                    <Input className="bg-gray-500 disabled:bg-gray-600 ml-1 text-slate-200" value={value || "Server Key"} type={isShow ? "text" : "password"} disabled/>
                    <Button onClick={onclickForEye}  disabled={isShow} size={"sm"} variant={"link"}>
                        {!isShow ? <Eye /> : <EyeOff/>}
                    </Button>
                    <CopyButton value={value || ""}/>
                </div>
            </div>
        </div>
    </div>
}