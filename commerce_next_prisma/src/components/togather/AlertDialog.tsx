import {
    AlertDialog as ShadAlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialog = (p: {
    title?: string;
    description?: string;
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    disabled: boolean;
}) => {
    return (
        <ShadAlertDialog open={p.open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{p.title || "Are you absolutely sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {p.description ||
                            "This action cannot be undone. This will permanently delete data from the servers."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="items-center space-x-2 pt-6">
                    <AlertDialogCancel disabled={p.disabled} onClick={p.onCancel}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={p.disabled} onClick={p.onConfirm}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </ShadAlertDialog>
    );
};

export default AlertDialog;
