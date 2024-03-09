"use client";

import { useEffect, useState } from "react";

import { DeleteModal } from "@/components/modals/delete-modal";
import { SpinnerModal } from "@/components/modals/spinner-modal";

const Providers = () => {
    const [mounded, setMounded] = useState(false);

    useEffect(() => {
        setMounded(true);
    }, []);

    if (!mounded) {
        return null;
    }

    return (
        <>
            <DeleteModal />
            <SpinnerModal />
        </>
    );
};

export default Providers;
