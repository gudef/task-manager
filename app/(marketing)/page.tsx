import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
export default function Home() {
  return (
    <div className="h-screen mx-auto w-full flex flex-col 
    items-center justify-center p-4 gap-2 bg-gradient-to-b from-red-200 to-blue-200
    gap-y-10">
      
        <Image src="/task.svg" width={100} height={100} alt="task"/>

        <h1 className="text-xl lg:text-3xl font-bold text-red-600
        max-w-[600px] text-center">
          Master your task with Task Manager
        </h1>

        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/task"
                signInForceRedirectUrl="/task"
                >
                <Button size="lg" variant="destructive" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/task"
                >
                <Button size="lg" variant="default" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="default" className="w-full" asChild>
                <Link href="/task">
                  Continue Using Task Manager
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
  
  );
}
