import { StreamPlayer } from "@/components/Stream_Player";
import { getUserByUserName } from "@/lib/getUser-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreaterpageProps {
    params: {
        username: string;
    }
}

const Createrpage = async ({
    params
}: CreaterpageProps) => {
    const externalUser = await currentUser();
    const user = await getUserByUserName(params.username);

    if(!user || (user.clerkUserId !== externalUser?.id) || (!user.stream)) {
        throw new Error("Unauthorized!");
    }

    return <div className="h-full">
        <StreamPlayer user={user} stream={user.stream} isFollowing/>
    </div>
}

export default Createrpage;