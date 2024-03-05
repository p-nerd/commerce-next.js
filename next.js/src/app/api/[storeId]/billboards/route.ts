import stores from "@/collections/stores";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: Request,
    { params }: { params: { id: string; storeId: string } },
) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const body = (await req.json()) as { label: string; imageUrl: string };

        if (!body.label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if (!body.imageUrl) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }

        const store = stores.find(params.storeId);
        if (!store) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const billboard = await prisma().billboard.create({
            data: { ...body, storeId: params.storeId },
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARDS::POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const PATCH = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, id } = body;
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!id) {
            return new NextResponse("Id is required", { status: 400 });
        }

        const store = await prisma().store.update({ where: { id }, data: { name } });

        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORES::PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (!id) {
            return new NextResponse("Id is required", { status: 400 });
        }

        await prisma().store.delete({ where: { id } });

        return NextResponse.json({ id: "store deleted" });
    } catch (error) {
        console.log("[STORES::DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
