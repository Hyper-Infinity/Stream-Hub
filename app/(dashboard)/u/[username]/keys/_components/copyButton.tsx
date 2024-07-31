"use client"

import { Button } from "@/components/ui/button";
import {Copy, CheckCheck} from "lucide-react"
import { useState } from "react";

interface CopyButtonProps {
    value: string;
}

export const CopyButton = ({
    value
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopyHandler = async () => {
        if(!value) return;
        setIsCopied(true);
        await navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 500);
    }

    return <Button onClick = {onCopyHandler} disabled={!value || isCopied} size="sm" variant={"ghost"}>
        {isCopied ? <CheckCheck /> : <Copy />}
    </Button>
}