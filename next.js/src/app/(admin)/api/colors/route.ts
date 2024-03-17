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

        const color = await prisma().color.create({ data: { name, value } });
        return NextResponse.json(color);
    } catch (e: any) {
        console.log("[COLORS::POST]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const colorId = request.nextUrl.searchParams.get("id") as string;
        if (!colorId) {
            return errorResponse("id param is required", 400);
        }

        const { name, value } = (await request.json()) as { name: string; value: string };
        if (!name) {
            return errorResponse("Name is required", 400);
        }
        if (!value) {
            return errorResponse("Value is required", 400);
        }

        const color = await prisma().color.update({
            where: { id: colorId },
            data: { name, value },
        });
        return NextResponse.json(color);
    } catch (e: any) {
        console.log("[COLORS::PATCH]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const colorId = request.nextUrl.searchParams.get("id") as string;
        if (!colorId) {
            return errorResponse("id param is required", 400);
        }

        await prisma().color.delete({ where: { id: colorId } });

        return NextResponse.json({ id: "color deleted" });
    } catch (e: any) {
        console.log("[COLORS::DELETE]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};
