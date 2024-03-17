"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { useSpinnerModal } from "./spinner-modal";

import { AlertDialog, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { AlertDialogContent, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@/components/ui/alert-dialog";

export const useDeleteModal = create<{
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    pending: boolean;
    setPending: (disabled: boolean) => void;
    onCancel: () => void;
    setOnCancel: (onCancel: () => void) => void;
    onConfirm: () => void;
    setOnConfirm: (onConfirm: () => void) => void;
}>(set => ({
    open: false,
    setOpen: open => set(s => ({ ...s, open })),
    title: "Are you absolutely sure?",
    setTitle: (title: string) => set(s => ({ ...s, title })),
    description: "This will permanently delete data from the servers.",
    setDescription: (description: string) => set(s => ({ ...s, description })),
    pending: false,
    setPending: pending => set(s => ({ ...s, pending })),
    onCancel: () => {},
    setOnCancel: (onCancel: () => void) => set(s => ({ ...s, onCancel })),
    onConfirm: () => {},
    setOnConfirm: (onConfirm: () => void) => set(s => ({ ...s, onConfirm })),
}));

export const DeleteModal = () => {
    const { open, title, description, pending, onCancel, onConfirm, setOpen } = useDeleteModal();
    const { setLoading } = useSpinnerModal();

    useEffect(() => {
        setLoading(pending);
    }, [pending, setLoading]);

    return (
        <>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="items-center space-x-2 pt-6">
                        <AlertDialogCancel
                            disabled={pending}
                            onClick={() => {
                                onCancel();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={pending} onClick={onConfirm}>
                            Continue {pending && "..."}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
