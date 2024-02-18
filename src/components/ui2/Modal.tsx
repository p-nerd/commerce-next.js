"use client";

import type { ReactNode } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const Modal = (p: {
    title: string;
    description: string;
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}) => {
    return (
        <Dialog
            open={p.open}
            onOpenChange={open => {
                if (!open) {
                    p.onClose();
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{p.title}</DialogTitle>
                    <DialogDescription>{p.description}</DialogDescription>
                </DialogHeader>
                {p.children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
