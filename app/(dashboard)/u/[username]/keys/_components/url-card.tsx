import { Input } from "@/components/ui/input";
import { CopyButton } from "./copyButton";

interface urlCardProps {
    value: string | null;
}

export const UrlCard = ({
    value
}: urlCardProps) => {
    return <div className="rounded-xl bg-gray-800 p-6">
        <div className="flex items-center gap-x-10">
            <p className="font-semibold shrink-0">
                Server URL :
            </p>
            <div className="space-y-2 w-full">
                <div className="w-full flex items-center gap-x-2">
                    <Input className="bg-gray-500 disabled:bg-gray-600 text-slate-200" value={value || "Srever URL"} disabled/>
                    <CopyButton value={value || ""}/>
                </div>
            </div>
        </div>
    </div>
}