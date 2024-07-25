import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/getUser-service"
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUserName(params.username);
    if (!user) { notFound(); }

    const isFollowing = await isFollowingUser(user.id);
    const isBlockedByThisUser = await isBlockedByUser(user.id);

    if(isBlockedByThisUser) { notFound(); }

    return <div className="flex flex-col gap-y-2 p-4">
        userName: {user.userName}
        <Actions isFollowing={isFollowing} userId={user.id}/>
    </div>
}

export default UserPage;