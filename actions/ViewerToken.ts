"use server"

import { v4 } from "uuid"
import { AccessToken } from "livekit-server-sdk"
import { getSelf, getUserById } from "@/lib/getUser-service"
import { isBlockedByUser } from "@/lib/block-service"

export const createViewerToken = async (hostIdentity: string) => {
    let self;
    try {
        self = await getSelf();
    } catch {
        const id = v4();
        const userName = `guest#${Math.floor(Math.random() * 1000)}`;
        self = {id, userName};
    }

    const host = await getUserById(hostIdentity);

    if(!host) {
        throw new Error("Host Not Found !");
    }

    const isBlocked = await isBlockedByUser(host.id);

    if(isBlocked) {
        throw new Error("You are blocked by the host !");
    }

    const isHost = self.id == host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.userName
        }
    )

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    })

    return await Promise.resolve(token.toJwt())
}