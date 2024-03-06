"use client";

import APIAlert from "@/components/together/APIAlert";
import useOrigin from "@/hooks/useOrigin";

const APIKeys = () => {
    const origin = useOrigin();
    return (
        <div>
            <APIAlert title="API_URL" code={`${origin}`} variant="public" />
        </div>
    );
};

export default APIKeys;
