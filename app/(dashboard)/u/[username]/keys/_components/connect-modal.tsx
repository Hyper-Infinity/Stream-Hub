"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"
import { IngressInput } from "livekit-server-sdk"
import { useState, useTransition, useRef, ElementRef } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPanding, startTransition] = useTransition();
    const [ingressType, setIgressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
            .then(() => { 
                toast.success("Ingress Created 🎉🎉");
                closeRef?.current?.click();
            })
            .catch(() => toast.error("Not Able To Create Ingress! Try After Sometime 🤕🤕"));
        })
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant={"primary"}>
                Generate Connection
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Generate Connection
                </DialogTitle>
            </DialogHeader>
            <Select
                disabled={isPanding}
                value={ingressType}
                onValueChange={(value) => {
                    setIgressType(value);   
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ingress Type" /> 
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RTMP}>RTMP</SelectItem>
                    <SelectItem value={WHIP}>WHIP</SelectItem>
                </SelectContent>
            </Select>
            <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="pb-2 text-red-600">Warning!</AlertTitle>
                <AlertDescription>
                    This action will reset all the active streams using the current connection.
                </AlertDescription>
            </Alert>
            <div className="flex justify-between">
                <DialogClose ref={closeRef} asChild>
                    <Button variant={"outline2"}>
                        Cancle
                    </Button>
                </DialogClose>
                <Button
                    onClick={() => (onSubmit())}
                    disabled={isPanding}
                    variant={"destructive2"}
                >
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
}