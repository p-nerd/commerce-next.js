"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { useDeleteModal } from "@/components/modals/delete-modal";
import { toast } from "@/components/modals/toast-modal";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useDeleteSize = () => {
    const { pending, setDescription, setOnConfirm, setPending, setOpen } = useDeleteModal();

    const deleteSize = (a: { sizeId: string; onAfterDelete?: () => void }) => {
        setDescription("This action cannot be undone. This will permanently delete this size.");
        setOnConfirm(async () => {
            try {
                setPending(true);
                await ajax.delete(`/api/sizes?id=${a.sizeId}`);
                setOpen(false);
                a.onAfterDelete && a.onAfterDelete();
                toast.success("Size deleted successfully");
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            } finally {
                setPending(false);
            }
        });
        setOpen(true);
    };

    return { pending, deleteSize };
};

const Delete = (p: { sizeId: string }) => {
    const { push, refresh } = useRouter();
    const { pending, deleteSize } = useDeleteSize();

    return (
        <>
            <Button
                disabled={pending}
                variant="destructive"
                size="sm"
                onClick={() =>
                    deleteSize({
                        sizeId: p.sizeId,
                        onAfterDelete: () => {
                            push("/admin/sizes");
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
