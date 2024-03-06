import type { Store } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { loggedUserId } from "@/helpers/auth";

export type TStore = Store;

const stores = {
    create: async (name: string): Promise<TStore> => {
        const userId = loggedUserId();
        return await prisma().store.create({
            data: { name, userId },
        });
    },
    finds: async (): Promise<TStore[]> => {
        return await prisma().store.findMany();
    },
    update: async (id: string, name: string) => {
        return await prisma().store.update({
            where: { id },
            data: { name },
        });
    },
};

export default stores;
