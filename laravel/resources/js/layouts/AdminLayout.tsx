import type { ReactNode, HTMLAttributes } from "react";
import type { PageProps } from "@/types";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

import { StoreIcon } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSub } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuPortal, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuShortcut, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
        href: "/admin/colors",
        label: "Colors",
    },
    {
        href: "/admin/products",
        label: "Products",
    },
    {
        href: "/admin/orders",
        label: "Orders",
    },
    {
        href: "/admin/settings",
        label: "Settings",
    },
];

const Links = (p: HTMLAttributes<HTMLElement>) => {
    const pathname = usePage().url;
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

const ProfileDropdown = () => {
    const user = usePage<PageProps>().props.auth.user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    {user.name}
                    <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            href={route("profile.edit")}
                            className="flex w-full items-center justify-between"
                        >
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={route("logout")}
                        method="post"
                        className="flex w-full items-center justify-between"
                    >
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const AdminLayout = (p: { children: ReactNode }) => {
    return (
        <>
            <Head title="Admin" />
            <div className="border-b">
                <div className="mx-auto flex h-16 max-w-7xl items-center">
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
                        <ProfileDropdown />
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl py-3">{p.children}</div>
        </>
    );
};

export default AdminLayout;
