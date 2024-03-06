import { Separator } from "@/components/ui/separator";

import Heading from "@/components/together/Heading";

import From from "./From";
import APIKeys from "./APIKeys";
import stores from "@/collections/stores";

const Settings = async () => {
    const store = await stores.findFirstOne();
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <Heading title="Settings" description="Manage store settings" />
                </div>
                <Separator />
                <From store={store} />
                <APIKeys />
            </div>
        </div>
    );
};

export default Settings;
