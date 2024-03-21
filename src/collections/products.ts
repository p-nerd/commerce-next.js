import type { TSize } from "./sizes";
import type { TColor } from "./colors";
import type { TCategory } from "./categories";
import type { Image, Product } from "@prisma/client";
import type { TProductCardData } from "@/components/pisces/ProductCard";

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
    findsForProductCard: async (options?: {
        isFeatured?: boolean;
        categoryId?: string;
        take?: number;
    }): Promise<TProductCardData[]> => {
        const where: { [key: string]: any } = {};

        if (options?.isFeatured) {
            where.isFeatured = true;
        }
        if (options?.categoryId) {
            where.categoryId = options.categoryId;
        }

        return await prisma().product.findMany({
            select: {
                id: true,
                images: {
                    select: {
                        name: true,
                        path: true,
                    },
                    take: 1,
                },
                name: true,
                price: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            where,
            orderBy: {
                createdAt: "desc",
            },
            take: options?.take,
        });
    },
    remove: async (productId: string) => {
        return prisma().product.delete({
            where: { id: productId },
        });
    },
};

export default products;
