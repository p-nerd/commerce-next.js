import type { Size } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type TSize = Size;

const sizes = {
    find: async (id: string): Promise<TSize | null> => {
        return await prisma().size.findFirst({ where: { id } });
    },
    finds: async (): Promise<TSize[]> => {
        return await prisma().size.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    },
};

export default sizes;
