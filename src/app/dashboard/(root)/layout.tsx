import { type ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const SetupLayout = async (p: { children: ReactNode }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const store = await prisma().store.findFirst({
        where: {
            userId,
        },
    });
    if (store) {
        redirect(`/dashboard/${store.id}`);
    }
    return <>{p.children}</>;
};

export default SetupLayout;
