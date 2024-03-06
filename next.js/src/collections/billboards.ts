import type { Billboard } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type TBillboard = Billboard;

const billboards = {
    find: async (id: string): Promise<TBillboard | null> => {
        return await prisma().billboard.findFirst({ where: { id } });
    },
    finds: async (storeId: string): Promise<TBillboard[]> => {
        return await prisma().billboard.findMany({ where: { storeId } });
    },
};

export default billboards;
