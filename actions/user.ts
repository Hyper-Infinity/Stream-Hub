"use server"

import { getSelf } from "@/lib/getUser-service";
import { User } from "@prisma/client"
import db from "@/lib/db"
import { revalidatePath } from "next/cache";

export const updateUser = async(value: Partial<User>) => {
    try {
        const self = await getSelf();

        const valideData = {
            bio: value.bio
        }

        const user = await db.user.update({
            where: {
                id: self.id
            }, 
            data: {
                ...valideData
            }
        })

        revalidatePath(`/${user.userName}`);
        revalidatePath(`/u/${user.userName}`);
        return user;
    } catch {
        throw new Error("Internal Error!");
    }
}