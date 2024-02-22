import { prisma } from "@/lib/prisma";
import { Billboard } from "@prisma/client";

export type TBillboard = Billboard;

const find = async (billboardId: string): Promise<TBillboard | null> => {
    const billboard = await prisma().billboard.findFirst({
        where: {
            id: billboardId,
        },
    });
    return billboard;
};

const billboards = {
    find,
};

export default billboards;
