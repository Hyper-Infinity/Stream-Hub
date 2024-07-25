import db from "./db"
import { getSelf } from "./getUser-service"

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: {
                id: id
            }
        })
    
        if(!otherUser) {
            throw new Error("User not found !");
        }

        if(otherUser.id === self.id) {
            return false;
        }

        const isBlocked = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
            }
        })

        return !!isBlocked;
    } catch(e) {
        return false;
    }
}

export const blockUser = async (id: string) => {
    const self = await getSelf();
    if(self.id === id) {
        throw new Error("Cannot block yourself !");
    }

    const otherUser = await db.user.findUnique({
        where: {
            id: id
        }
    })  
    if(!otherUser) {
        throw new Error("User not found !");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })
    if(existingBlock) {
        throw new Error("You have already blocked this user !");
    }

    const blockedData = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        }, 
        include: {
            blocked: true,
        }
    })
    return blockedData;
}

export const unblockUser = async (id: string) => {
    const self = await getSelf();
    if(self.id === id) {
        throw new Error("Cannot unblock yourself !");
    }

    const otherUser = await db.user.findUnique({
        where: {
            id: id
        }
    })  
    if(!otherUser) {
        throw new Error("User not found !");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })
    if(!existingBlock) {
        throw new Error("User not found in your blockList !");
    }

    const unblockedData = await db.block.delete({
        where: {
            id: existingBlock.id
        }, 
        include: {
            blocked: true,
        }
    })
    return unblockedData;
}

