"use client";

import { cn } from "@/lib/utils";

import { NavigationMenu, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

import Link from "next/link";

const ListItem = (p: { href: string; title: string; description?: string; className?: string }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={p.href}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        p.className,
                    )}
                >
                    <div className="text-sm font-medium leading-none">{p.title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {p.description}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
};

const CategoriesLinks = (p: { data: { id: string; name: string; description?: string }[] }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="rounded-full">
                        Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex w-[400px] flex-col p-4">
                            {p.data.map(({ id, name, description }) => (
                                <ListItem
                                    key={id}
                                    href={`/categories/${id}`}
                                    title={name}
                                    description={description}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default CategoriesLinks;
