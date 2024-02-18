import type { ReactNode } from "react";

import stores from "@/models/stores";
import Navbar from "./Navbar";

const DashboardLayout = async (p: { children: ReactNode; params: { storeId: string } }) => {
    await stores.find(p.params.storeId);
    return (
        <>
            <Navbar />
            {p.children}
        </>
    );
};

export default DashboardLayout;
