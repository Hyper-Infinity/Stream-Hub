import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
    return (
        <div className="flex flex-col items-center gap-y-3">
            <div className="bg-slate-200 rounded-full p-1">
                <Image src="/logo2.0.svg" alt="StreamHub" height="80" width="80" />
            </div>
            <div className={cn("flex flex-col items-center space-y-1", font.className)}>
                <p className="text-xl text-slate-200 font-semibold">StreamHub</p>
                <p className="text-sm text-muted-foreground">Let&apos;s Go Live</p>
            </div>
        </div>
    );
}