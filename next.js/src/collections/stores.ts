import type { Store } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { loggedUserId } from "@/helpers/auth";

export type TStore = Store;

const stores = {
    create: async (name: string): Promise<TStore> => {
        const userId = loggedUserId();
        return await prisma().store.create({
            data: { name: name.trim(), userId },
        });
    },
    finds: async (): Promise<TStore[]> => {
        return await prisma().store.findMany();
    },
    findFirstOne: async () => {
        const list = await stores.finds();
        return list?.length >= 1 ? list[0] : await stores.create("Commerce Store");
    },
    update: async (id: string, name: string) => {
        return await prisma().store.update({
            where: { id },
            data: { name: name.trim() },
        });
    },
};

export default stores;
