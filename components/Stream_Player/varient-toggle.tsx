"use client"

import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react" 
import { Hint } from "../hint-provider"
import { Button } from "../ui/button"
import { ChatVatiant, useChatSideBar } from "@/store/use-chat-sidebar"

export const VarientToggle = () => {
    const {variant, onChangeVariant} = useChatSideBar((state) => state);
    const isChat = variant === ChatVatiant.CHAT;
    const Icon = isChat ? Users : MessageSquare;
    const onToggle = () => {
        const Newvarient = isChat ? ChatVatiant.COMMUNITY : ChatVatiant.CHAT;
        onChangeVariant(Newvarient); 
    }

    const label = isChat ? "Community" : "Go Back To Chat";

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