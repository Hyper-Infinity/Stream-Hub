import db from "./db"
import { getSelf } from "./getUser-service"

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: {
                id: id
            }
        })

        if (!otherUser) {
            throw new Error("User not found !");
        }

        if (otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: self.id,
                    followingId: otherUser.id
                }
            }
        })
        return !!existingFollow;
    } catch (e) {
        return false;
    }
}

export const followUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: {
            id: id
        }
    });

    if (!otherUser) {
        throw new Error("User not found !");
    }

    if (self.id === otherUser.id) {
        throw new Error("Can not follow yourself !");
    }

    const existingFollow = await db.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: self.id,
                followingId: otherUser.id
            }
        }
    })

    if (existingFollow) {
        throw new Error("Already Following !");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            follower: true,
            following: true
        }
    });

    return follow;
}

export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: {
            id: id
        }
    });

    if (!otherUser) {
        throw new Error("User not found !");
    }

    if (self.id === otherUser.id) {
        throw new Error("Can not unfollow yourself !");
    }

    const existingFollow = await db.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: self.id,
                followingId: otherUser.id
            }
        }
    })

    if (!existingFollow) {
        throw new Error("Not Following !");
    }

    const unfollow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            follower: true,
            following: true
        }
    });

    return unfollow;
}

export const getFollowedUsers = async () => {
    try {   
        const user = await getSelf();
        const allFollowedUser = await db.follow.findMany({
            where: {
                followerId: user.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: user.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true
                            }
                        }
                    }
                }
            }
        })
        return allFollowedUser;
    } catch(e) {
        return [];
    }  
}