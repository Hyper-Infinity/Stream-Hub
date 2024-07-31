import db from "./db"
import { getSelf } from "./getUser-service"

export const getRecommended = async () => {
    let userId;
    try {
        const user = await getSelf();
        userId = user.id;
    }
    catch (e) {
        userId = null;
    }

    let users = [];
    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        }
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: "desc"
            }, 
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            }
        })
    }
    else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }, 
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            }
        })
    }
    return users;
}

