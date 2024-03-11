import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import stores from "@/collections/stores";

import From from "./From";
import APIKeys from "./APIKeys";

const Settings = async () => {
    const store = await stores.findFirstOne();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store settings" />
            </div>
            <Separator />
            <From store={store} />
            <APIKeys />
        </div>
    );
};

export default Settings;
