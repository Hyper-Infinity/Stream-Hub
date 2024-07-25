import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from 'next/link'

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
    return (
        <Link href="/">
            <div className="flex justify-center items-center gap-x-3 hover:opacity-75 transition">
                <div className="bg-slate-200 rounded-full p-1 mr-3 shrink-0 md:mr-0 md:shrink ">
                    <Image src="/logo2.0.svg" alt="StreamHub" height="50" width="50" />
                </div>
                <div className={cn("hidden md:flex flex-col space-y-0", font.className)}>
                    <p className="text-xl font-semibold">StreamHub</p>
                    <p className="text-sm text-muted-foreground pl-[2px]">Creator DashBoard</p>
                </div>
            </div>
        </Link>
    );
}