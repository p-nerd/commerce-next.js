import type { Image } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type TImage = Image;

const images = {
    creates: async (
        images: { name: string; path: string; productId: string }[],
    ): Promise<PromiseSettledResult<TImage>[]> => {
        return await Promise.allSettled(
            images?.map(image =>
                prisma().image.create({
                    data: {
                        name: image.name,
                        path: image.path,
                        productId: image.productId,
                    },
                }),
            ),
        );
    },
    removesByImageIDs: async (imageIDs: string[]): Promise<PromiseSettledResult<TImage>[]> => {
        return await Promise.allSettled(
            imageIDs.map(imageId =>
                prisma().image.delete({
                    where: { id: imageId },
                }),
            ),
        );
    },
    removesByProductID: async (productId: string) => {
        return prisma().image.deleteMany({
            where: { productId },
        });
    },
};

export default images;
