"use client"

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/useravatar";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type blockedUser = {
    usedId: string;
    imageUrl: string;
    userName: string;
    createdAt: string;
}

export const columns: ColumnDef<blockedUser>[] = [
    {
        accessorKey: "userName",
        header: ({column}) => <Button
            variant="ghost"
            onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc")
            }}
        >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>,
        cell: ({row}) => <div className="flex items-center gap-x-4">
            <UserAvatar imageUrl={row.original.imageUrl} userName={row.original.userName}/>
            <span>{row.original.userName}</span>
        </div>
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => <Button
            variant="ghost"
            onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc")
            }}
        >
            Date Blocked
            <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>,
    },
    {
        id: "actions",
        cell: ({row}) => <UnblockButton userId={row.original.usedId}/>
    },
]
