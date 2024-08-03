"use server"

import { blockUser, unblockUser } from "@/lib/block-service"
import { getSelf } from "@/lib/getUser-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomSrevice = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!, 
    process.env.LIVEKIT_API_KEY!, 
    process.env.LIVEKIT_API_SECRET!, 
)

export const onBlock = async (id: string) => {
    try {
        const self = await getSelf();
        let BlockedUser;
        try {
            BlockedUser = await blockUser(id);
        } catch {

        } 
        
        try {
            await roomSrevice.removeParticipant(self.id, id);
        } catch {

        }

        revalidatePath('/');
        revalidatePath(`/u/${self.userName}/community`);
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