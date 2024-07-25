"use server"

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    try {
        const BlockedUser = await blockUser(id);

        revalidatePath('/');

        if(BlockedUser) {
            revalidatePath(`/${BlockedUser.blocked.userName}`);
        }

        return BlockedUser;
    } catch (e) {
        throw new Error("Internal server error !");
    }
}

export const onUnblock = async (id: string) => {
    try {
        const UnBlockedUser = await unblockUser(id);

        revalidatePath('/');

        if(UnBlockedUser) {
            revalidatePath(`/${UnBlockedUser.blocked.userName}`);
        }

        return UnBlockedUser;
    } catch (e) {
        throw new Error("Internal server error !");
    }
}