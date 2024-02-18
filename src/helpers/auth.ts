import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const loggedUserId = (): string => {
    const { userId } = auth();
    if (!userId) {
        console.log("not logged in");
        redirect("/sign-in");
    }

    return userId;
};
