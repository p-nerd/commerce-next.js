import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

import billboards, { TBillboard } from "@/collections/billboards";
import Heading from "@/components/together/Heading";
import From from "./From";
import Delete from "./Delete";

const Billboard = async (p: { params: { id: string } }) => {
    let billboard: TBillboard | null = null;
    if (p.params.id !== "new") {
        billboard = await billboards.find(p.params.id);
        if (!billboard) {
            notFound();
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={billboard ? "Edit Billboard" : "Create Billboard"}
                    description={billboard ? "Edit a existing billboard" : "Create a new billboard"}
                />
                {!!billboard && <Delete billboardId={billboard.id} />}
            </div>
            <Separator />
            <From billboard={billboard} />
        </>
    );
};

export default Billboard;
