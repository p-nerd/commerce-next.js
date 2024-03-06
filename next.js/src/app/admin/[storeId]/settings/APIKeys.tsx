"use client";

import APIAlert from "@/components/together/APIAlert";
import useOrigin from "@/hooks/useOrigin";

const APIKeys = (p: { storeId: string }) => {
    const origin = useOrigin();
    return (
        <div>
            <APIAlert title="API_URL" code={`${origin}/${p.storeId}`} variant="public" />
        </div>
    );
};

export default APIKeys;
