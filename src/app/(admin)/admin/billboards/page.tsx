import { buttonVariants } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Heading } from "@/components/ui2/typography";

import billboards from "@/collections/billboards";

import Link from "next/link";
import Table from "./Table";

export const metadata = {
    title: "Billboards - Commerce Admin",
};

const Billboards = async () => {
    const billboardsList = await billboards.finds();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Billboards (${billboardsList.length})`}
                        description="Manage billboards for your store"
                    />
                    <Link href="/admin/billboards/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <Table billboards={billboardsList} />
            </div>
        </div>
    );
};

export default Billboards;
