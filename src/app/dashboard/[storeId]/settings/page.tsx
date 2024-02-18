import { Separator } from "@/components/ui/separator";

import Heading from "@/components/ui2/Heading";

import UpdateFrom from "./UpdateFrom";
import DeleteStore from "./DeleteStore";

import stores from "@/models/stores";

const Settings = async (p: { params: { storeId: string } }) => {
    const store = await stores.find(p.params.storeId);
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <Heading title="Settings" description="Manage store settings" />
                    <DeleteStore storeId={store.id} />
                </div>
                <Separator />
                <UpdateFrom store={store} />
            </div>
        </div>
    );
};

export default Settings;
