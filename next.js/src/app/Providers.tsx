"use client";

import { useEffect, useState } from "react";

import { DeleteModal } from "@/components/modals/delete-modal";
import { SpinnerModal } from "@/components/modals/spinner-modal";
import { ToastModal } from "@/components/modals/toast-modal";

const Providers = () => {
    const [mounded, setMounded] = useState(false);

    useEffect(() => {
        setMounded(true);
    }, []);

    if (!mounded) {
        return <></>;
    }

    return (
        <>
            <DeleteModal />
            <SpinnerModal />
            <ToastModal />
        </>
    );
};

export default Providers;
