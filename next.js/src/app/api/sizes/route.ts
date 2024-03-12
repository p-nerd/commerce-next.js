import { errorResponse } from "@/helpers/response";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { name, value } = (await req.json()) as { name: string; value: string };
        if (!name) {
            return errorResponse("Name is required", 400);
        }
        if (!value) {
            return errorResponse("Value is required", 400);
        }

        const size = await prisma().size.create({ data: { name, value } });
        return NextResponse.json(size);
    } catch (e: any) {
        console.log("[SIZES::POST]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const sizeId = request.nextUrl.searchParams.get("id") as string;
        if (!sizeId) {
            return errorResponse("id param is required", 400);
        }

        const { name, value } = (await request.json()) as { name: string; value: string };
        if (!name) {
            return errorResponse("Name is required", 400);
        }
        if (!value) {
            return errorResponse("Value is required", 400);
        }

        const size = await prisma().size.update({
            where: { id: sizeId },
            data: { name, value },
        });
        return NextResponse.json(size);
    } catch (e: any) {
        console.log("[SIZES::PATCH]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const sizeId = request.nextUrl.searchParams.get("id") as string;
        if (!sizeId) {
            return errorResponse("id param is required", 400);
        }

        await prisma().size.delete({ where: { id: sizeId } });

        return NextResponse.json({ id: "size deleted" });
    } catch (e: any) {
        console.log("[SIZES::DELETE]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};
