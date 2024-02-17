"use client";

import { StoreModel } from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

const ModelProviders = () => {
    const [mounded, setMounded] = useState(false);

    useEffect(() => {
        setMounded(true);
    }, []);

    if (!mounded) {
        return null;
    }

    return (
        <>
            <StoreModel />
        </>
    );
};

export { ModelProviders };
