"use client";

import { useEffect, useState } from "react";

import { StoreModel } from "@/components/models/store-model";

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
