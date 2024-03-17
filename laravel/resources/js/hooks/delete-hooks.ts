import { ajax } from "@/lib/ajax";
import { useDeleteModal } from "@/components/modals/delete-modal";
import { toast } from "@/components/modals/toast-modal";

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
                toast.error(
                    error?.response?.data?.message || error?.message || "Something went wrong",
                );
            } finally {
                setPending(false);
            }
        });
        setOpen(true);
    };

    return { pending, deleteBillboard };
};
