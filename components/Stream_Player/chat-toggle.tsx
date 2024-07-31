"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react" 
import { Hint } from "../hint-provider"
import { Button } from "../ui/button"
import { useChatSideBar } from "@/store/use-chat-sidebar"

export const ChatToggle = () => {
    const {collapsed, onCollapse, onExpand} = useChatSideBar((state) => state);
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
    const label = collapsed ? "Expand" : "Collapse";
    const onToggle = () => {
        if(collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    }

    return <Hint label={label} side={"left"} asChild>
        <Button
            onClick={onToggle}
            variant={"ghost"}
            className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        >
            <Icon className="h-4 w-4"/>
        </Button>
    </Hint>
}