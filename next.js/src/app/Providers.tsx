"use client";

import { DeleteModal } from "@/components/modals/delete-modal";
import { useEffect, useState } from "react";

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
        </>
    );
};

export default Providers;
