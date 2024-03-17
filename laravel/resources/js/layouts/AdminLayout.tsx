import { buttonVariants } from "@/components/ui/button";

import { StoreIcon } from "lucide-react";

import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { useState, ReactNode } from "react";
import Dropdown from "@/components/Dropdown";
import { PageProps } from "@/types";

const Links = (p: HTMLAttributes<HTMLElement>) => {
    const pathname = usePage().url;

    console.log("pathname", pathname);

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
                        }
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

const UserProfile = () => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const user = usePage<PageProps>().props.auth.user;

    return (
        <div className="flex justify-between h-16">
            <div className="flex items-center sm:ms-6">
                <div className="ms-3 relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {user.name}

                                    <svg
                                        className="ms-2 -me-0.5 h-4 w-4"
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
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route("logout")} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
                <button
                    onClick={() => setShowingNavigationDropdown(previousState => !previousState)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path
                            className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const AdminLayout = async (p: { children: ReactNode }) => {
    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <Link
                        href="/admin"
                        className={cn(
                            "w-[200px] justify-between",
                            buttonVariants({ variant: "outline", size: "sm" })
                        )}
                    >
                        <StoreIcon className="mr-2 h-4 w-4" />
                        Commerce Admin
                    </Link>
                    <Links />
                    <div className="ml-auto flex items-center space-x-4">
                        <UserProfile />
                    </div>
                </div>
            </div>
            {p.children}
        </>
    );
};

export default AdminLayout;
