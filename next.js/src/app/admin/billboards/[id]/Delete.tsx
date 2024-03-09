"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDeleteModal } from "@/components/modals/delete-modal";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useDeleteBillboard = () => {
    const deleteModal = useDeleteModal();

    const deleteBillboard = (billboardId: string, onAfterDelete: () => void) => {
        deleteModal.setDescription(
            "This action cannot be undone. This will permanently delete this billboard.",
        );
        deleteModal.setOnConfirm(async () => {
            try {
                deleteModal.setPending(true);
                await ajax.delete(`/api/billboards?id=${billboardId}`);
                deleteModal.setOpen(false);
                onAfterDelete();
                toast.success("Billboard deleted successfully");
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            } finally {
                deleteModal.setPending(false);
            }
        });
        deleteModal.setOpen(true);
    };

    return { pending: deleteModal.pending, deleteBillboard };
};

const Delete = (p: { billboardId: string }) => {
    const router = useRouter();
    const { pending, deleteBillboard } = useDeleteBillboard();
    return (
        <>
            <Button
                disabled={pending}
                variant="destructive"
                size="sm"
                onClick={() =>
                    deleteBillboard(p.billboardId, () => router.push("/admin/billboards"))
                }
            >
                <Trash className="h-4 w-4" />
            </Button>
        </>
    );
};

export default Delete;
