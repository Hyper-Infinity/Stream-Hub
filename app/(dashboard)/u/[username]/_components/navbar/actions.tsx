import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export const Actions = async () => {
    return <div className="flex justify-end items-center gap-x-2">
        <Button size={"sm"} variant={"ghost"} className="text-muted-foreground hover:text-primary" asChild>
            <Link href={"/"}>
                <LogOut className="h-5 w-5 mr-2"/>
                Exit 
            </Link>
        </Button>
        <UserButton/>
    </div>
}
