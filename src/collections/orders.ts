import type { Order, OrderItem, Product } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type TOrder = Order & { orderItems: (OrderItem & { product: Product })[] };

const orders = {
    find: async (id: string): Promise<TOrder | null> => {
        return await prisma().order.findFirst({
            where: {
                id,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    },
    finds: async (): Promise<TOrder[]> => {
        return await prisma().order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    },
};

export default orders;
