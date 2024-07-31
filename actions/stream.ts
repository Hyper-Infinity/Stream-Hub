"use server"

import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"
import db from "@/lib/db"
import { getSelf } from "@/lib/getUser-service"

export const updateStream = async (values: Partial<Stream>) => {
    try {   
        const self = await getSelf();
        const stream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        })

        if(!stream) {
            throw new Error("Stream not found !");
        }

        const valideData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowerOnly: values.isChatFollowerOnly,
            isChatDelayed: values.isChatDelayed
        }

        const updatedStream = await db.stream.update({
            where: {
                userId: self.id
            }, 
            data: {
                ...valideData,
            }
        })

        revalidatePath(`/u/${self.userName}/chat`);
        revalidatePath(`/u/${self.userName}`);
        revalidatePath(`/${self.userName}`);

    } catch(e) {
        throw new Error("Internal server error!");
    }
}