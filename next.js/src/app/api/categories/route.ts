import { errorResponse } from "@/helpers/response";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { name, billboardId } = (await req.json()) as { name: string; billboardId: string };
        if (!name) {
            return errorResponse("Name is required", 400);
        }
        if (!billboardId) {
            return errorResponse("Billboard is required", 400);
        }

        const category = await prisma().category.create({ data: { name, billboardId } });
        return NextResponse.json(category);
    } catch (e: any) {
        console.log("[CATEGORIES::POST]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const categoryId = request.nextUrl.searchParams.get("id") as string;
        if (!categoryId) {
            return errorResponse("id param is required", 400);
        }

        const { name, billboardId } = (await request.json()) as {
            name: string;
            billboardId: string;
        };
        if (!name) {
            return errorResponse("Name is required", 400);
        }
        if (!billboardId) {
            return errorResponse("Billboard is required", 400);
        }

        const category = await prisma().category.update({
            where: { id: categoryId },
            data: { name, billboardId },
        });
        return NextResponse.json(category);
    } catch (e: any) {
        console.log("[CATEGORIES::PATCH]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const categoryId = request.nextUrl.searchParams.get("id") as string;
        if (!categoryId) {
            return errorResponse("id param is required", 400);
        }

        await prisma().category.delete({ where: { id: categoryId } });

        return NextResponse.json({ id: "category deleted" });
    } catch (e: any) {
        console.log("[CATEGORIES::DELETE]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};
