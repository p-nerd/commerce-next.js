import type { ReactNode } from "react";

import stores from "@/collections/stores";
import Navbar from "./Navbar";

const adminLayout = async (p: { children: ReactNode; params: { storeId: string } }) => {
    await stores.find(p.params.storeId);
    return (
        <>
            <Navbar />
            {p.children}
        </>
    );
};

export default adminLayout;
