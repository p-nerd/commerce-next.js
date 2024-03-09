"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { useDeleteModal } from "@/components/modals/delete-modal";
import { toast } from "@/components/modals/toast-modal";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useDeleteBillboard = () => {
    const { pending, setDescription, setOnConfirm, setPending, setOpen } = useDeleteModal();

    const deleteBillboard = (a: { billboardId: string; onAfterDelete?: () => void }) => {
        setDescription(
            "This action cannot be undone. This will permanently delete this billboard.",
        );
        setOnConfirm(async () => {
            try {
                setPending(true);
                await ajax.delete(`/api/billboards?id=${a.billboardId}`);
                setOpen(false);
                a.onAfterDelete && a.onAfterDelete();
                toast.success("Billboard deleted successfully");
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            } finally {
                setPending(false);
            }
        });
        setOpen(true);
    };

    return { pending, deleteBillboard };
};

const Delete = (p: { billboardId: string }) => {
    const { push, refresh } = useRouter();
    const { pending, deleteBillboard } = useDeleteBillboard();

    return (
        <>
            <Button
                disabled={pending}
                variant="destructive"
                size="sm"
                onClick={() =>
                    deleteBillboard({
                        billboardId: p.billboardId,
                        onAfterDelete: () => {
                            push("/admin/billboards");
                            refresh();
                        },
                    })
                }
            >
                <Trash className="h-4 w-4" />
            </Button>
        </>
    );
};

export default Delete;
