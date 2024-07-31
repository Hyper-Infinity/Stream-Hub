import { create } from "zustand";

export enum ChatVatiant {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY"
}

interface ChatSideBarStore {
    collapsed: boolean,
    variant: ChatVatiant,
    onExpand: () => void,
    onCollapse: () => void,
    onChangeVariant: (variant: ChatVatiant) => void
}

export const useChatSideBar = create<ChatSideBarStore>((set) => ({
    collapsed: false,
    variant: ChatVatiant.CHAT,
    onExpand: () => set(() => ({collapsed: false})),
    onCollapse: () => set(() => ({collapsed: true})),
    onChangeVariant: (variant: ChatVatiant) => set(() => ({ variant }))
}))