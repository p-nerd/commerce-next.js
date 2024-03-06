import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const { label, imageUrl } = (await req.json()) as { label: string; imageUrl: string };
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }

        const billboard = await prisma().billboard.create({ data: { label, imageUrl } });
        return NextResponse.json(billboard);
    } catch (e: any) {
        console.log("[BILLBOARDS::POST]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const billboardId = request.nextUrl.searchParams.get("id") as string;
        if (!billboardId) {
            return new NextResponse("id param is required", { status: 400 });
        }

        const { label, imageUrl } = (await request.json()) as { label: string; imageUrl: string };
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if (!imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }

        const billboard = await prisma().billboard.update({
            where: { id: billboardId },
            data: { label, imageUrl },
        });
        return NextResponse.json(billboard);
    } catch (e: any) {
        console.log("[BILLBOARDS::PATCH]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const billboardId = request.nextUrl.searchParams.get("id") as string;
        if (!billboardId) {
            return new NextResponse("id param is required", { status: 400 });
        }

        await prisma().billboard.delete({ where: { id: billboardId } });

        return NextResponse.json({ id: "billboard deleted" });
    } catch (e: any) {
        console.log("[BILLBOARDS::DELETE]", e);
        return new NextResponse(e?.message || "Internal error", { status: 500 });
    }
};
