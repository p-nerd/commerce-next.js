import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import stores, { TStore } from "@/collections/stores";

export const PATCH = async (request: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name } = await request.json();
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const storesList = await stores.finds();
        const store: TStore = await (storesList?.length >= 1
            ? stores.update(storesList[0].id, name)
            : stores.create(name));

        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORES::PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
