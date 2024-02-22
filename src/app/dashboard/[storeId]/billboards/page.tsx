import Heading from "@/components/together/Heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

const Billboards = (p: { params: { storeId: string } }) => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading title="Billboards" description="Manage billboards for your store" />
                <Link
                    href={`/dashboard/${p.params.storeId}/billboards/new`}
                    className={buttonVariants()}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Link>
            </div>
            <Separator />
        </div>
    );
};

export default Billboards;
