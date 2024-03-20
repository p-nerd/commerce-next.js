import { NextResponse } from "next/server";

export const errorResponse = (message: string, status: 500 | 400 = 500) => {
    return NextResponse.json({ message }, { status });
};
