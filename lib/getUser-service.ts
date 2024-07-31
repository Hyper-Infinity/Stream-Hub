import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db"

export const getSelf = async () => {
    const user = await currentUser();
    if(!user || !user.username) {
        throw new Error("Unauthorized !");
    }
    const dbUser = await db.user.findFirst({
        where: {
            clerkUserId: user.id
        }
    })

    if(!dbUser) {
        throw new Error("User not found in Database !");
    }

    return dbUser;
}

export const getUserByUserName = async (username: string) => {
    const userData = await db.user.findFirst({
        where: {
            userName: username
        }, 
        include: {
            stream: true
        }
    });
    return userData;
}

export const getSelfByUserNmae = async (userName: string) => {
    const user = await currentUser();
    if(!user || !user.username) {
        throw new Error("Unauthorized !");
    }

    const selfData = await db.user.findUnique({
        where: {
            userName: userName
        }
    })

    if(!selfData) {
        throw new Error("User not found !");
    }

    if(selfData.userName !== user.username) {
        throw new Error("Unauthorizezd !");
    }

    return selfData;
}

export const getUserById = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }, 
        include: {
            stream: true
        }
    })
    return user;
}