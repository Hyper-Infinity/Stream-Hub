"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { 
    useState, 
    useTransition,
    useRef, 
    ElementRef
} from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone, UploadButton, Uploader } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint-provider";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface EditInfoProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const EditInfo = ({
    initialName,
    initialThumbnailUrl
}: EditInfoProps) => {
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [isPanding, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(() => {
            updateStream({name})
            .then(() => {
                toast.success("Stream Info Updated !", {duration: 1500});
                closeRef?.current?.click(); 
            })
            .catch(() => toast.error("Something went wrong ! 😬😬", {duration: 1500}));
        })
    }

    const removeThumbnail = () => {
        startTransition(() => {
            updateStream({thumbnailUrl: null})
            .then(() => {
                toast.success("Thumbnail Removed !", {duration: 1500});
                closeRef?.current?.click(); 
                setThumbnailUrl(null);
            })
            .catch(() => toast.error("Something went wrong ! 😬😬", {duration: 1500}));
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"link"}
                    size={"sm"}
                    className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Stream Info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder="Stream Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            disabled={isPanding}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-10">
                                    <Hint asChild side="left" label="remove thubnail">
                                        <Button
                                            type="button"
                                            variant={"outline2"}
                                            disabled={isPanding}
                                            onClick={removeThumbnail}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash2/>
                                        </Button>
                                    </Hint>
                                </div>
                                <Image 
                                    src={thumbnailUrl}
                                    alt="Thubnail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ): (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone 
                                    endpoint="thumbnailFileUploader"
                                    appearance={{
                                        label: {
                                            color: "#FFFFFF"
                                        },
                                        allowedContent: {
                                            color: "#FFFFFF"
                                        }
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                        closeRef?.current?.click(); 
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <Button
                            disabled={isPanding}
                            type="submit"
                            className="font-semibold"
                        >
                            Save
                        </Button>
                        <DialogClose ref={closeRef}>
                            <Button
                                disabled={isPanding}
                                variant={"destructive2"}
                                type="button"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}