"use client";

import { useEffect, useState } from "react";
import { APIAlert } from "@/components/ui2/typography";

const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return "";
    }

    return window?.location?.origin || "";
};

const APIKeys = () => {
    const origin = useOrigin();
    return (
        <div>
            <APIAlert title="API_URL" code={`${origin}`} variant="public" />
        </div>
    );
};

export default APIKeys;
