import type { TSize } from "@/collections/sizes";

import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import sizes from "@/collections/sizes";

import Form from "./Form";
import Delete from "./Delete";

const Size = async (p: { params: { id: string } }) => {
    let size: TSize | null = null;
    if (p.params.id !== "new") {
        size = await sizes.find(p.params.id);
        if (!size) {
            notFound();
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={size ? "Edit Size" : "Create Size"}
                    description={size ? "Edit a existing size" : "Create a new size"}
                />
                {!!size && <Delete sizeId={size.id} />}
            </div>
            <Separator />
            <Form size={size} />
        </div>
    );
};

export default Size;
