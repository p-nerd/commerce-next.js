import type { ReactNode } from "react";

import { UserButton } from "@clerk/nextjs";

import stores from "@/tables/stores";
import StoreSwitcher from "./StoreSwitcher";
import MainNav from "./MainNav";

const Navbar = async () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher stores={await stores.finds()} />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

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
