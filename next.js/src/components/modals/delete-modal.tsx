import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { create } from "zustand";

export const useDeleteModal = create<{
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    disabled: boolean;
    setDisabled: (disabled: boolean) => void;
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
    disabled: false,
    setDisabled: disabled => set(s => ({ ...s, disabled })),
    onCancel: () => { },
    setOnCancel: (onCancel: () => void) => set(s => ({ ...s, onCancel })),
    onConfirm: () => { },
    setOnConfirm: (onConfirm: () => void) => set(s => ({ ...s, onConfirm })),
}));

export const DeleteModal = () => {
    const { open, title, description, disabled, onCancel, onConfirm, setOpen } = useDeleteModal();
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
                            disabled={disabled}
                            onClick={() => {
                                onCancel();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={disabled} onClick={onConfirm}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
