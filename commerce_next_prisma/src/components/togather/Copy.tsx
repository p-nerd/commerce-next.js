"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Copy = (p: { children: ReactNode; text: string; toast: string }) => {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => {
                navigator.clipboard.writeText(p.text);
                toast.success(p.toast);
            }}
        >
            {p.children}
        </Button>
    );
};

export default Copy;
