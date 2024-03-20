import type { TColor } from "@/collections/colors";

import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import colors from "@/collections/colors";

import Form from "./Form";
import Delete from "./Delete";

export const metadata = {
    title: "Color - Commerce Admin",
};

const Color = async (p: { params: { id: string } }) => {
    let color: TColor | null = null;
    if (p.params.id !== "new") {
        color = await colors.find(p.params.id);
        if (!color) {
            notFound();
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={color ? "Edit Color" : "Create Color"}
                    description={color ? "Edit a existing color" : "Create a new color"}
                />
                {!!color && <Delete colorId={color.id} />}
            </div>
            <Separator />
            <Form color={color} />
        </div>
    );
};

export default Color;
