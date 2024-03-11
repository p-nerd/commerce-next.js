"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

import utils from "@/helpers/utils";

export const Copy = (p: { children: ReactNode; text: string; toastPrefix: string }) => {
    return (
        <Button variant="outline" size="icon" onClick={() => utils.copy(p.text, p.toastPrefix)}>
            {p.children}
        </Button>
    );
};
