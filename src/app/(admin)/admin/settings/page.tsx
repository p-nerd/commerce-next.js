import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import stores from "@/collections/stores";

import Form from "./Form";
import APIKeys from "./APIKeys";

export const metadata = {
    title: "Settings - Commerce Admin",
};

const Settings = async () => {
    const store = await stores.findFirstOne();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store settings" />
            </div>
            <Separator />
            <Form store={store} />
            <APIKeys />
        </div>
    );
};

export default Settings;
