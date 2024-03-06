import { type ReactNode } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { loggedUserId } from "@/helpers/auth";

const SetupLayout = async (p: { children: ReactNode }) => {
    const userId = loggedUserId();
    const store = await prisma().store.findFirst({
        where: {
            userId,
        },
    });
    if (store) {
        redirect(`/admin/${store.id}`);
    }
    return <>{p.children}</>;
};

export default SetupLayout;
