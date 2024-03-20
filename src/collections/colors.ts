import type { Color } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type TColor = Color;

const colors = {
    find: async (id: string): Promise<TColor | null> => {
        return await prisma().color.findFirst({ where: { id } });
    },
    finds: async (): Promise<TColor[]> => {
        return await prisma().color.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    },
};

export default colors;
