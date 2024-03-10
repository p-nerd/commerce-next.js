import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { UserButton } from "@clerk/nextjs";
import { StoreIcon } from "lucide-react";

import Link from "next/link";
import Links from "./Links";

const Layout = async (p: { children: ReactNode }) => {
    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <Link
                        href="/admin"
                        className={cn(
                            "w-[200px] justify-between",
                            buttonVariants({ variant: "outline", size: "sm" }),
                        )}
                    >
                        <StoreIcon className="mr-2 h-4 w-4" />
                        Commerce Admin
                    </Link>
                    <Links />
                    <div className="ml-auto flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
            {p.children}
        </>
    );
};

export default Layout;
