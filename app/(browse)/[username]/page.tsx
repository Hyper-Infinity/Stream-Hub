import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/getUser-service"
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/Stream_Player";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUserName(params.username);
    if (!user || !user.stream) { notFound(); }

    const isFollowing = await isFollowingUser(user.id);
    const isBlockedByThisUser = await isBlockedByUser(user.id);

    if(isBlockedByThisUser) { notFound(); }

    return <StreamPlayer
        isFollowing={isFollowing}
        stream={user.stream}
        user={user}
    />
}

export default UserPage;