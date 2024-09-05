import db from "./db";
import { getSelf } from "./getUser-service";

export const getSearch = async (term?: string) => {
    let userId;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch (e) {
        userId = null;
    }

    let streams = [];
    if (userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    },
                },
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            userName: {
                                contains: term,
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                updatedAt: true,
                isLive: true,
                name: true,
                thumbnailUrl: true,
                userId: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    }
    else {
        streams = await db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            userName: {
                                contains: term,
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                updatedAt: true,
                isLive: true,
                name: true,
                thumbnailUrl: true,
                userId: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: "desc"
                }
            ]
        })
    }
    return streams;
}