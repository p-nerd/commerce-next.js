"use client";

import { Model } from "@/components/ui2/model";
import { create } from "zustand";

const useStoreModel = create<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>(set => ({
    open: false,
    setOpen: open => {
        set(s => ({ ...s, open: open }));
    },
}));

const StoreModel = () => {
    const { open, setOpen } = useStoreModel();

    return (
        <Model
            open={open}
            title="Create Store"
            description="Add new store to manage products and categories"
            onClose={() => setOpen(false)}
        />
    );
};

export { useStoreModel, StoreModel };
