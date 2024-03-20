import { errorResponse } from "@/helpers/response";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { label, imageUrl } = (await req.json()) as { label: string; imageUrl: string };
        if (!label) {
            return errorResponse("Label is required", 400);
        }
        if (!imageUrl) {
            return errorResponse("ImageUrl is required", 400);
        }

        const billboard = await prisma().billboard.create({ data: { label, imageUrl } });
        return NextResponse.json(billboard);
    } catch (e: any) {
        console.log("[BILLBOARDS::POST]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const billboardId = request.nextUrl.searchParams.get("id") as string;
        if (!billboardId) {
            return errorResponse("id param is required", 400);
        }

        const { label, imageUrl } = (await request.json()) as { label: string; imageUrl: string };
        if (!label) {
            return errorResponse("Label is required", 400);
        }
        if (!imageUrl) {
            return errorResponse("ImageUrl is required", 400);
        }

        const billboard = await prisma().billboard.update({
            where: { id: billboardId },
            data: { label, imageUrl },
        });
        return NextResponse.json(billboard);
    } catch (e: any) {
        console.log("[BILLBOARDS::PATCH]", e);
        return errorResponse(e?.message || "Internal error", 500);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const billboardId = request.nextUrl.searchParams.get("id") as string;
        if (!billboardId) {
            return errorResponse("id param is required", 400);
        }

        await prisma().billboard.delete({ where: { id: billboardId } });

        return NextResponse.json({ id: "billboard deleted" });
    } catch (e: any) {
        console.log("[BILLBOARDS::DELETE]", e);
        return errorResponse(e?.message || "Internal error", 400);
    }
};
