import { buttonVariants } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Heading } from "@/components/ui2/typography";

import sizes from "@/collections/sizes";

import Link from "next/link";
import Table from "./Table";

export const metadata = {
    title: "Sizes - Commerce Admin",
};

const Sizes = async () => {
    const sizesList = await sizes.finds();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Sizes (${sizesList.length})`}
                        description="Manage sizes for your store"
                    />
                    <Link href="/admin/sizes/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <Table sizes={sizesList} />
            </div>
        </div>
    );
};

export default Sizes;
