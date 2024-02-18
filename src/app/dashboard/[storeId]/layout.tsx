import type { ReactNode } from "react";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

import { UserButton } from "@clerk/nextjs";

import StoreSwitcher from "./StoreSwitcher";
import MainNav from "./MainNav";

const Navbar = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prisma().store.findMany({ where: { userId } });
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher stores={stores} />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

const DashboardLayout = async (p: { children: ReactNode; params: { storeId: string } }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prisma().store.findFirst({
        where: {
            id: p.params.storeId,
            userId,
        },
    });
    if (!store) {
        redirect("/dashboard");
    }

    return (
        <>
            <Navbar />
            {p.children}
        </>
    );
};

export default DashboardLayout;
