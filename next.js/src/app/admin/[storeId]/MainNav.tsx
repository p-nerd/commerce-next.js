"use client";

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

import Link from "next/link";

const MainNav = (p: HTMLAttributes<HTMLElement>) => {
    const params = useParams();
    const pathname = usePathname();

    const routes = [
        {
            href: `/admin/${params.storeId}`,
            label: "Overview",
        },
        {
            href: `/admin/${params.storeId}/billboards`,
            label: "Billboards",
        },
        {
            href: `/admin/${params.storeId}/settings`,
            label: "Settings",
        },
    ];

    return (
        <nav className={cn("mx-6 flex items-center space-x-4 lg:space-x-6", p.className)}>
            {routes.map(route => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                        {
                            "text-foreground": pathname === route.href,
                        },
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default MainNav;
