"use client";

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";

const Links = (p: HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();

    const routes = [
        {
            href: "/admin",
            label: "Overview",
        },
        {
            href: "/admin/billboards",
            label: "Billboards",
        },
        {
            href: "/admin/categories",
            label: "Categories",
        },
        {
            href: "/admin/sizes",
            label: "Sizes",
        },
        {
            href: "/admin/settings",
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

export default Links;
