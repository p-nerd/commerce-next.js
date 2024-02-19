import { loggedUserId } from "@/helpers/auth";
import { prisma } from "@/lib/prisma";
import { Store } from "@prisma/client";
import { redirect } from "next/navigation";

export type TStore = Store;

const find = async (storeId: string): Promise<Store> => {
    const userId = loggedUserId();
    const store = await prisma().store.findFirst({
        where: {
            id: storeId,
            userId,
        },
    });
    if (!store) {
        redirect("/dashboard");
    }
    return store;
};

const finds = async (): Promise<Store[]> => {
    const userId = loggedUserId();
    const stores = await prisma().store.findMany({ where: { userId } });
    return stores;
};

const stores = {
    find,
    finds,
};

export default stores;
