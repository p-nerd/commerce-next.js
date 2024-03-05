import billboards from "@/collections/billboards";
import Heading from "@/components/together/Heading";
import { Separator } from "@/components/ui/separator";

import From from "./From";
import Delete from "./Delete";

const Billboard = async (p: { params: { id: string; storeId: string } }) => {
    const billboard = await billboards.find(p.params.id);

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={billboard ? "Edit Billboard" : "Create Billboard"}
                    description={billboard ? "Edit a existing billboard" : "Create a new billboard"}
                />
                {!!billboard && <Delete billboardId={billboard.id} storeId={p.params.storeId} />}
            </div>
            <Separator />
            <From billboard={billboard} storeId={p.params.storeId} />
        </div>
    );
};

export default Billboard;
