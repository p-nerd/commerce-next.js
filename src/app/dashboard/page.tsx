"use client";

import { useStoreModel } from "@/components/modals/store-modal";
import { useEffect } from "react";

const Home = () => {
    const { open, setOpen } = useStoreModel();

    useEffect(() => {
        if (!open) {
            setOpen(true);
        }
    }, [open, setOpen]);

    return <div>Hello</div>;
};

export default Home;
