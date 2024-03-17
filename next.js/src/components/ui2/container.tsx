import type { ReactNode } from "react";

export const Container = (p: { children: ReactNode }) => {
    return <div className="mx-auto max-w-7xl">{p.children}</div>;
};
