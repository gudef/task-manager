import { Button } from "@/components/ui/button"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import Link from "next/link"

export const Navbar = () => {
    return(
        <div className="h-full border-2 border-purple-300 flex flex-col items-center justify-center">
            <h2 className="text-purple-800 text-sm">Account</h2>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
            </div>
            <Button variant="default" asChild>
            <Link href="/addtask">
                Add Task
            </Link>
            </Button>
        </div>
    )
}