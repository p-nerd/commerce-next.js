import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
    try {
        const { name, billboardId } = (await req.json()) as { name: string; billboardId: string };
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
        }

        const category = await prisma().category.create({ data: { name, billboardId } });
        return NextResponse.json(category);
    } catch (e: any) {
        console.log("[CATEGORIES::POST]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const categoryId = request.nextUrl.searchParams.get("id") as string;
        if (!categoryId) {
            return new NextResponse("ID param is required", { status: 400 });
        }

        const { name, billboardId } = (await request.json()) as {
            name: string;
            billboardId: string;
        };
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
        }

        const category = await prisma().category.update({
            where: { id: categoryId },
            data: { name, billboardId },
        });
        return NextResponse.json(category);
    } catch (e: any) {
        console.log("[CATEGORIES::PATCH]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const categoryId = request.nextUrl.searchParams.get("id") as string;
        if (!categoryId) {
            return new NextResponse("ID param is required", { status: 400 });
        }

        await prisma().category.delete({ where: { id: categoryId } });

        return NextResponse.json({ id: "category deleted" });
    } catch (e: any) {
        console.log("[CATEGORIES::DELETE]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};
