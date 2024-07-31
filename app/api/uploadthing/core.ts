import { getSelf } from "@/lib/getUser-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import db from "@/lib/db"

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailFileUploader: f({
        image: {
            maxFileSize: "4MB", 
            maxFileCount: 1
        }
    })
    .middleware(async () => {
        const self = await getSelf();
        return {user: self};
    })
    .onUploadComplete(async ({metadata, file}) => {
        await db.stream.update({
            where: {
                userId: metadata.user.id
            }, 
            data: {
                thumbnailUrl: file.url
            }
        })
        return {fileUrl: file.url};
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;