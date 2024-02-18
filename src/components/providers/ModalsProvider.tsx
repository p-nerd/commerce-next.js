"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

const ModalsProvider = () => {
    const [mounded, setMounded] = useState(false);

    useEffect(() => {
        setMounded(true);
    }, []);

    if (!mounded) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
};

export default ModalsProvider;
