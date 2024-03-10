import { NextRequest, NextResponse } from "next/server";

import stores from "@/collections/stores";

export const PATCH = async (request: NextRequest) => {
    try {
        const { name } = await request.json();
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const store = await stores.findFirstOne();
        const updatedStore = await stores.update(store.id, name);

        return NextResponse.json(updatedStore);
    } catch (error) {
        console.log("[STORES::PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
