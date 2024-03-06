import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import billboards from "@/collections/billboards";
import Heading from "@/components/together/Heading";
import Link from "next/link";

import Table from "./Table";

const Billboards = async (p: { params: { storeId: string } }) => {
    const billboardsList = await billboards.finds(p.params.storeId);
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${billboardsList.length})`}
                    description="Manage billboards for your store"
                />
                <Link
                    href={`/admin/${p.params.storeId}/billboards/new`}
                    className={buttonVariants()}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Link>
            </div>
            <Separator />
            <Table billboards={billboardsList} />
        </div>
    );
};

export default Billboards;
