import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

export const Actions = async () => {
    const user = await currentUser();
    return <div className="flex justify-end items-center gap-x-2 ml-4 lg:ml-0 md:ml-2">
        {!user ? (
            <SignInButton>
                <Button variant={"primary"}>
                    Login
                </Button>
            </SignInButton>
        ) : (
            <div className="flex items-center gap-x-4">
                <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="text-muted-foreground hover:text-primary"
                    asChild
                >
                    <Link href={`/u/${user.username}`}>
                        <Clapperboard className="h-5 w-5 lg:mr-2"/>
                        <span className="hidden md:block">
                            DashBoard
                        </span>
                    </Link>
                </Button>
                <UserButton/>
            </div>
        )}
    </div>
}
