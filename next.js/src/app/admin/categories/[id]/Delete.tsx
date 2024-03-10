"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { useDeleteModal } from "@/components/modals/delete-modal";
import { toast } from "@/components/modals/toast-modal";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useDeleteCategory = () => {
    const { pending, setDescription, setOnConfirm, setPending, setOpen } = useDeleteModal();

    const deleteCategory = (a: { categoryId: string; onAfterDelete?: () => void }) => {
        setDescription("This action cannot be undone. This will permanently delete this category.");
        setOnConfirm(async () => {
            try {
                setPending(true);
                await ajax.delete(`/api/categories?id=${a.categoryId}`);
                setOpen(false);
                a.onAfterDelete && a.onAfterDelete();
                toast.success("Category deleted successfully");
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            } finally {
                setPending(false);
            }
        });
        setOpen(true);
    };

    return { pending, deleteCategory };
};

const Delete = (p: { categoryId: string }) => {
    const { push, refresh } = useRouter();
    const { pending, deleteCategory } = useDeleteCategory();

    return (
        <>
            <Button
                disabled={pending}
                variant="destructive"
                size="sm"
                onClick={() =>
                    deleteCategory({
                        categoryId: p.categoryId,
                        onAfterDelete: () => {
                            push("/admin/categories");
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
