"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";

const Links = (p: { categories: { id: string; name: string }[] }) => {
    const pathname = usePathname();

    return (
        <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {p.categories.map(({ name, id }) => {
                const route = `/categories/${id}`;
                return (
                    <Link
                        key={id}
                        href={route}
                        className={cn(
                            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                            {
                                "text-foreground": pathname === route,
                            },
                        )}
                    >
                        {name}
                    </Link>
                );
            })}
        </div>
    );
};

export default Links;
