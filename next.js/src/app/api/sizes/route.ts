import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
    try {
        const { name, value } = (await req.json()) as { name: string; value: string };
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        const size = await prisma().size.create({ data: { name, value } });
        return NextResponse.json(size);
    } catch (e: any) {
        console.log("[SIZES::POST]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const sizeId = request.nextUrl.searchParams.get("id") as string;
        if (!sizeId) {
            return new NextResponse("ID param is required", { status: 400 });
        }

        const { name, value } = (await request.json()) as { name: string; value: string };
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        const size = await prisma().size.update({
            where: { id: sizeId },
            data: { name, value },
        });
        return NextResponse.json(size);
    } catch (e: any) {
        console.log("[SIZES::PATCH]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const sizeId = request.nextUrl.searchParams.get("id") as string;
        if (!sizeId) {
            return new NextResponse("ID param is required", { status: 400 });
        }

        await prisma().size.delete({ where: { id: sizeId } });

        return NextResponse.json({ id: "size deleted" });
    } catch (e: any) {
        console.log("[SIZES::DELETE]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};
