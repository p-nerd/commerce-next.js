import type { TBillboard } from "@/collections/billboards";

import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import billboards from "@/collections/billboards";

import Form from "./Form";
import Delete from "./Delete";

export const metadata = {
    title: "Billboard - Commerce Admin",
};

const Billboard = async (p: { params: { id: string } }) => {
    let billboard: TBillboard | null = null;
    if (p.params.id !== "new") {
        billboard = await billboards.find(p.params.id);
        if (!billboard) {
            notFound();
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={billboard ? "Edit Billboard" : "Create Billboard"}
                    description={billboard ? "Edit a existing billboard" : "Create a new billboard"}
                />
                {!!billboard && <Delete billboardId={billboard.id} />}
            </div>
            <Separator />
            <Form billboard={billboard} />
        </div>
    );
};

export default Billboard;
