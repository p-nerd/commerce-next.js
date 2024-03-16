import { errorResponse } from "@/helpers/response";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

import images from "@/collections/images";

type TPostOrPatchBody = {
    name: string;
    images: { id?: string; name: string; path: string }[];
    price: string;
    categoryId: string;
    colorId: string;
    sizeId: string;
    isFeatured: boolean;
    isArchived: boolean;
};

export const POST = async (request: NextRequest) => {
    try {
        const {
            images: imagesData,
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
        } = (await request.json()) as TPostOrPatchBody;
        if (!name) return errorResponse("Name is required", 400);
        if (!price) return errorResponse("Price is required", 400);
        if (!categoryId) return errorResponse("Category is required", 400);
        if (!colorId) return errorResponse("Color is required", 400);
        if (!sizeId) return errorResponse("SizeId is required", 400);

        const product = await prisma().product.create({
            data: {
                name,
                price: Number(price),
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
            },
        });

        await images.creates(
            imagesData.map(image => ({
                name: image.name,
                path: image.path,
                productId: product.id,
            })),
        );

        return NextResponse.json(product);
    } catch (e: any) {
        console.log("[PRODUCTS::POST]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const productId = request.nextUrl.searchParams.get("id") as string;
        if (!productId) {
            return errorResponse("id param is required", 400);
        }

        const {
            images: imagesData,
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
        } = (await request.json()) as TPostOrPatchBody;
        if (!name) return errorResponse("Name is required", 400);
        if (!price) return errorResponse("Price is required", 400);
        if (!categoryId) return errorResponse("Category is required", 400);
        if (!colorId) return errorResponse("Color is required", 400);
        if (!sizeId) return errorResponse("SizeId is required", 400);

        const product = await prisma().product.update({
            where: { id: productId },
            data: {
                name,
                price: Number(price),
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
            },
            include: {
                images: true,
            },
        });

        const newImages = imagesData.filter(image => !image.id);
        const newImagesPromices = images.creates(
            newImages.map(image => ({
                name: image.name,
                path: image.path,
                productId: product.id,
            })),
        );
        const removeableImages = product.images.filter(
            image => !imagesData.find(i => i.id === image.id),
        );
        const removeImagesPromices = images.removes(removeableImages.map(image => image.id));

        await Promise.all([newImagesPromices, removeImagesPromices]);

        return NextResponse.json(product);
    } catch (e: any) {
        console.log("[PRODUCTS::PATCH]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const productId = request.nextUrl.searchParams.get("id") as string;
        if (!productId) {
            return errorResponse("id param is required", 400);
        }

        await prisma().product.delete({ where: { id: productId } });

        return NextResponse.json({ id: "product deleted" });
    } catch (e: any) {
        console.log("[PRODUCTS::DELETE]", e);
        return errorResponse(e?.message || "Internal error", 400);
    }
};
