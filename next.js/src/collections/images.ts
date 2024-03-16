import type { Image } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type TImage = Image;

const images = {
    creates: async (
        images: { name: string; path: string; productId: string }[],
    ): Promise<TImage[]> => {
        const imagePromises = images?.map(image =>
            prisma().image.create({
                data: {
                    name: image.name,
                    path: image.path,
                    productId: image.productId,
                },
            }),
        );
        return await Promise.all(imagePromises);
    },
    removes: async (imageIDs: string[]) => {
        const imagePromises = imageIDs.map(imageId =>
            prisma().image.delete({ where: { id: imageId } }),
        );
        return await Promise.all(imagePromises);
    },
};

export default images;
