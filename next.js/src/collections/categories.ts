import type { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type TCategory = Category;

const categories = {
    find: async (id: string): Promise<TCategory | null> => {
        return await prisma().category.findFirst({ where: { id } });
    },
    finds: async (options: { includeBillboard?: boolean }): Promise<TCategory[]> => {
        return await prisma().category.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                billboard: options.includeBillboard,
            },
        });
    },
};

export default categories;
