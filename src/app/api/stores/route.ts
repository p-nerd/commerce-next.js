import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name } = body;
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const store = await prisma().store.create({ data: { name, userId } });

        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORES::POST]", error);
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
