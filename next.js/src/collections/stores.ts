import type { Store } from "@prisma/client";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { loggedUserId } from "@/helpers/auth";

export type TStore = Store;

const stores = {
    find: async (id: string): Promise<Store> => {
        const userId = loggedUserId();
        const store = await prisma().store.findFirst({ where: { id, userId } });
        if (!store) {
            redirect("/dashboard");
        }
        return store;
    },
    finds: async (): Promise<Store[]> => {
        const userId = loggedUserId();
        return await prisma().store.findMany({ where: { userId } });
    },
};

export default stores;
