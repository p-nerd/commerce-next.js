"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { useDeleteModal } from "@/components/modals/delete-modal";
import { toast } from "@/components/modals/toast-modal";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useDeleteColor = () => {
    const { pending, setDescription, setOnConfirm, setPending, setOpen } = useDeleteModal();

    const deleteColor = (a: { colorId: string; onAfterDelete?: () => void }) => {
        setDescription("This action cannot be undone. This will permanently delete this color.");
        setOnConfirm(async () => {
            try {
                setPending(true);
                await ajax.delete(`/api/colors?id=${a.colorId}`);
                setOpen(false);
                a.onAfterDelete && a.onAfterDelete();
                toast.success("Color deleted successfully");
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.message || error?.message || "Something went wrong",
                );
            } finally {
                setPending(false);
            }
        });
        setOpen(true);
    };

    return { pending, deleteColor };
};

const Delete = (p: { colorId: string }) => {
    const { push, refresh } = useRouter();
    const { pending, deleteColor } = useDeleteColor();

    return (
        <Button
            disabled={pending}
            variant="destructive"
            size="sm"
            onClick={() =>
                deleteColor({
                    colorId: p.colorId,
                    onAfterDelete: () => {
                        push("/admin/colors");
                        refresh();
                    },
                })
            }
        >
            <Trash className="h-4 w-4" />
        </Button>
    );
};

export default Delete;
