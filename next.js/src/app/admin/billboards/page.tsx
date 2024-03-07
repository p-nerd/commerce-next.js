import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import billboards from "@/collections/billboards";

import Heading from "@/components/together/Heading";
import Link from "next/link";
import Table from "./Table";

const Billboards = async () => {
    const billboardsList = await billboards.finds();
    return (
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
    );
};

export default Billboards;
