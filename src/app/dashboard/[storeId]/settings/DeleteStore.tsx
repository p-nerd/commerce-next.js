"use client";

import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import AlertDialog from "@/components/ui2/AlertDialog";

const DeleteStore = (p: { storeId: string }) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await ajax.delete(`/api/stores?id=${p.storeId}`);
            router.push("/dashboard");
            toast.success("Store deleted");
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertDialog
                description="This action cannot be undone. This will permanently delete this store."
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={handleDelete}
                disabled={loading}
            />
            <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
            >
                <Trash className="h-4 w-4" />
            </Button>
        </>
    );
};

export default DeleteStore;
