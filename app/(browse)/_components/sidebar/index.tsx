import { Following, FollowingSkeleton } from "./following"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"

import { getFollowedUsers } from "@/lib/follow-service"
import { getRecommended } from "@/lib/recommended-service"

export const SideBar = async () => {
    const recommended = await getRecommended();
    const following = await getFollowedUsers();
    return <Wrapper>
        <Toggle />
        <div className="space-y-4 pt-4 lg:pt-0">
            <Following data={following}/>
            <Recommended data={recommended}/>
        </div>
    </Wrapper>
}

export const SideBarSkeleton = () => {
    return <aside className="fixed flex flex-col left-0 w-[75px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
    </aside>
}