"use server"

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const data = await followUser(id);
        console.log(data);
        revalidatePath('/');

        if (data) {
            revalidatePath(`/${data.following.userName}`)
        }

        return data;

    } catch (e) {
        throw new Error("Internal server error !");
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const data = await unfollowUser(id);

        revalidatePath('/');

        if (data) {
            revalidatePath(`/${data.following.userName}`)
        }

        return data;

    } catch(e) { 
        console.log(e);
        throw new Error("Internal server error !");
    }
}