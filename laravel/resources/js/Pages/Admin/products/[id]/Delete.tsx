"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { useDeleteModal } from "@/components/modals/delete-modal";
import { toast } from "@/components/modals/toast-modal";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const useDeleteProduct = () => {
    const { pending, setDescription, setOnConfirm, setPending, setOpen } = useDeleteModal();

    const deleteProduct = (a: { productId: string; onAfterDelete?: () => void }) => {
        setDescription("This action cannot be undone. This will permanently delete this product.");
        setOnConfirm(async () => {
            try {
                setPending(true);
                await ajax.delete(`/api/products?id=${a.productId}`);
                setOpen(false);
                a.onAfterDelete && a.onAfterDelete();
                toast.success("Product deleted successfully");
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

    return { pending, deleteProduct };
};

const Delete = (p: { productId: string }) => {
    const { push, refresh } = useRouter();
    const { pending, deleteProduct } = useDeleteProduct();

    return (
        <>
            <Button
                disabled={pending}
                variant="destructive"
                size="sm"
                onClick={() =>
                    deleteProduct({
                        productId: p.productId,
                        onAfterDelete: () => {
                            push("/admin/products");
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
