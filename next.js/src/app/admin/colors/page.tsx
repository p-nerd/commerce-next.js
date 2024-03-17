import { buttonVariants } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Heading } from "@/components/ui2/typography";

import colors from "@/collections/colors";

import Link from "next/link";
import Table from "./Table";

export const metadata = {
    title: "Colors - Commerce Admin",
};

const Colors = async () => {
    const colorsList = await colors.finds();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Colors (${colorsList.length})`}
                        description="Manage colors for your store"
                    />
                    <Link href="/admin/colors/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <Table colors={colorsList} />
            </div>
        </div>
    );
};

export default Colors;
