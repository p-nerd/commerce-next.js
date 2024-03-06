import { Separator } from "@/components/ui/separator";

import Heading from "@/components/together/Heading";

import From from "./From";
import APIKeys from "./APIKeys";
import stores from "@/collections/stores";

const Settings = async () => {
    const store = await stores.findFirstOne();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store settings" />
            </div>
            <Separator />
            <From store={store} />
            <APIKeys />
        </>
    );
};

export default Settings;
