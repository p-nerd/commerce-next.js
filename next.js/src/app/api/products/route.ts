import { errorResponse } from "@/helpers/response";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { name } = (await request.json()) as { name: string };
        if (!name) {
            return errorResponse("Name is required", 400);
        }

        const product = await prisma().product.create({
            data: { name, price: "", categoryId: "", colorId: "", sizeId: "" },
        });
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

        const { name } = (await request.json()) as { name: string };
        if (!name) {
            return errorResponse("Name is required", 400);
        }

        const product = await prisma().product.update({
            where: { id: productId },
            data: { name, price: "", categoryId: "", colorId: "", sizeId: "" },
        });
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
