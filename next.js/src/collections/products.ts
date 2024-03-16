import type { Image, Product } from "@prisma/client";
import type { TSize } from "./sizes";
import type { TColor } from "./colors";
import type { TCategory } from "./categories";

import { prisma } from "@/lib/prisma";

export type TProduct = Product & {
    category: TCategory;
    size: TSize;
    color: TColor;
    images: Image[];
};

const products = {
    find: async (id: string): Promise<TProduct | null> => {
        return await prisma().product.findFirst({
            include: {
                category: {
                    include: {
                        billboard: true,
                    },
                },
                size: true,
                color: true,
                images: true,
            },
            where: { id },
        });
    },
    finds: async (): Promise<TProduct[]> => {
        return await prisma().product.findMany({
            include: {
                category: {
                    include: {
                        billboard: true,
                    },
                },
                size: true,
                color: true,
                images: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },
};

export default products;
