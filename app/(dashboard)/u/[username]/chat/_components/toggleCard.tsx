"use client"

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type fieldType = "isChatEnabled" | "isChatDelayed" | "isChatFollowerOnly";

interface ToggleCardProps {
    field: fieldType;
    label: string;
    value: boolean;
}

export const ToggleCard = ({
    field,
    label,
    value
}: ToggleCardProps) => {
    const [isPanding, startTransition] = useTransition();

    const onChange = () => {
        startTransition(() => {
            updateStream({[field]: !value})
            .then(() => toast.success("Chat Settings Updated ✅✅", { duration: 1500 }))
            .catch(() => toast.error("Something went wrong 😬😬", { duration: 1500 }))
        })
    }

    return <div className="rounded-xl bg-gray-800 p-6">
        <div className="flex justify-between items-center">
            <p className="font-semibold shrink-0">
                {label}
            </p>
            <div className="space-y-2">
                <Switch onCheckedChange={onChange} disabled={isPanding} checked={value} />
            </div>
        </div>
    </div>
}

export const ToggleCardSkeleton = () => {
    return <Skeleton className="rounded-xl p-10 w-full"/>
}