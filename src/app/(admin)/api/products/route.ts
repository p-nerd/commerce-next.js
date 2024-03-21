import { errorResponse } from "@/helpers/response";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

import images from "@/collections/images";
import products from "@/collections/products";

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
        const body = (await request.json()) as TPostOrPatchBody;

        if (!body.name) return errorResponse("Name is required", 400);
        if (!body.price) return errorResponse("Price is required", 400);
        if (!body.categoryId) return errorResponse("Category is required", 400);
        if (!body.colorId) return errorResponse("Color is required", 400);
        if (!body.sizeId) return errorResponse("SizeId is required", 400);

        const product = await prisma().product.create({
            data: {
                name: body.name,
                price: Number(body.price),
                categoryId: body.categoryId,
                colorId: body.colorId,
                sizeId: body.sizeId,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived,
            },
        });

        await images.creates(
            body.images.map(image => ({
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

        const body = (await request.json()) as TPostOrPatchBody;

        if (!body.name) return errorResponse("Name is required", 400);
        if (!body.price) return errorResponse("Price is required", 400);
        if (!body.categoryId) return errorResponse("Category is required", 400);
        if (!body.colorId) return errorResponse("Color is required", 400);
        if (!body.sizeId) return errorResponse("SizeId is required", 400);

        const product = await prisma().product.update({
            where: { id: productId },
            data: {
                name: body.name,
                price: Number(body.price),
                categoryId: body.categoryId,
                colorId: body.colorId,
                sizeId: body.sizeId,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived,
            },
            include: {
                images: true,
            },
        });

        const newImages = body.images.filter(image => !image.id);
        const removeImages = product.images.filter(i => !body.images.find(i2 => i.id === i2.id));

        await Promise.allSettled([
            images.creates(newImages.map(({ name, path }) => ({ name, path, productId }))),
            images.removesByImageIDs(removeImages.map(image => image.id)),
        ]);

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

        await images.removesByProductID(productId);
        await products.remove(productId);

        return NextResponse.json({ id: "product deleted" });
    } catch (e: any) {
        console.log("[PRODUCTS::DELETE]", e);
        return errorResponse(e?.message || "Internal error", 400);
    }
};
