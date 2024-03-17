import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const Container = (p: { children: ReactNode; className?: string }) => {
    return <div className={cn("mx-auto max-w-7xl", p.className)}>{p.children}</div>;
};
