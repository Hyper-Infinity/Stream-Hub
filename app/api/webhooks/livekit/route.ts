import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import db from "@/lib/db"
import { revalidatePath } from "next/cache";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!, 
    process.env.LIVEKIT_API_SECRET!
);

export const POST = async (req: Request) => {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if(!authorization) {
        return new Response("No Authorization Header!", {status: 400});
    }

    const event = await receiver.receive(body, authorization);

    if(event.event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId
            }, 
            data: {
                isLive: true
            }
        })
    }
    
    if(event.event === "ingress_ended") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId
            }, 
            data: {
                isLive: false
            }
        })
    }

    return new Response("No Problem", {status: 200});
}