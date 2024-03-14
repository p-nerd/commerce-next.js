import type { Category } from "@prisma/client";
import type { TBillboard } from "./billboards";

import { prisma } from "@/lib/prisma";

export type TCategory = Category & { billboard: TBillboard };

const categories = {
    find: async (id: string): Promise<TCategory | null> => {
        return await prisma().category.findFirst({
            include: {
                billboard: true,
            },
            where: { id },
        });
    },
    finds: async (): Promise<TCategory[]> => {
        return await prisma().category.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                billboard: true,
            },
        });
    },
};

export default categories;
