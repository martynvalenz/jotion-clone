'use client'

import { useScrollTop } from "@/hooks/useScrollTop"
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import Link from "next/link";

const Navbar = () => {
  const {isAuthenticated, isLoading} = useConvexAuth()
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      'z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]',
      scrolled && 'shadow-md border-b'
    )}>
      <Logo/>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {
          isLoading && (
            <Spinner size="icon"/>
          )
        }
        {
          !isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">
                  Get Jotion free
                </Button>
              </SignInButton>
            </>
          )
        }
        {
          isAuthenticated && !isLoading && (
            <>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/documents">
                  Enter Jotion
                </Link>
              </Button>
              <UserButton/>
            </>
          )
        }
        <ModeToggle/>
      </div>
    </div>
  )
}

export default Navbar