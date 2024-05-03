"use client"

import { todo } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown } from "lucide-react"

import { deleteTask, markTask } from "@/actions/todo-action"

import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type MyObject = {
  id: string;
  userId: string;
  text: string;
  status: typeof todo.$inferSelect["status"];

};




export const columns: ColumnDef<MyObject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "UserID",
  },
  {
    accessorKey: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: props => (
      <span className={cn("text-lg",
        props.getValue() === "done" && "text-green-500", 
        props.getValue() === "pending" && "text-yellow-500", 
        props.getValue() === "false" && "text-red-500",
      )}
      >
        {`${props.getValue()}`}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      /* eslint-disable react-hooks/rules-of-hooks */
      const task = row.original;
      const router = useRouter();
      /* eslint-disable react-hooks/rules-of-hooks */
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.text)}
            >
              Copy Task to Clipboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-green-600"
              onClick={() => 
                markTask(task.id, "done")
                  .then((success) => {
                    console.log("success");
                  })
                  .then((error) => {
                    console.log("error");
                  })
              }
            >
              Mark Done
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-yellow-600"
              onClick={() => 
                markTask(task.id, "pending")
                  .then((success) => {
                    console.log("success");
                  })
                  .then((error) => {
                    console.log("error");
                  })
              }
            >
              Mark Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => 
                markTask(task.id, "false")
                  .then((success) => {
                    console.log("success");
                  })
                  .then((error) => {
                    console.log("error");
                  })
              }
            >
              Mark False
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/edittask/${task.id}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => 
                deleteTask(task.id)
                  .then((success) => {
                    console.log("success");
                  })
                  .then((error) => {
                    console.log("error");
                  })
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]