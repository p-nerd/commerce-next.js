"use client";

import { useStoreModal } from "@/components/modals/store-modal";
import { useEffect } from "react";

const Home = () => {
    const { open, setOpen } = useStoreModal();

    useEffect(() => {
        if (!open) {
            setOpen(true);
        }
    }, [open, setOpen]);

    return <></>;
};

export default Home;
