import { Heading } from "@/components/ui2/heading";
import { Separator } from "@/components/ui/separator";

import UpdateFrom from "./UpdateFrom";
import DeleteStore from "./DeleteStore";

import stores from "@/tables/stores";

const Settings = async (p: { params: { storeId: string } }) => {
    const store = await stores.find(p.params.storeId);
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <Heading title="Settings" description="Manage store settings" />
                    <DeleteStore />
                </div>
                <Separator />
                <UpdateFrom store={store} />
            </div>
        </div>
    );
};

export default Settings;
