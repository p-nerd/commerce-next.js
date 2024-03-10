import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import categories from "@/collections/categories";

import Heading from "@/components/together/Heading";
import Link from "next/link";
import Table from "./Table";

const Categories = async () => {
    const categoriesList = await categories.finds({ includeBillboard: true });
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Categories (${categoriesList.length})`}
                        description="Manage categories for your store"
                    />
                    <Link href="/admin/categories/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <Table categories={categoriesList} />
            </div>
        </div>
    );
};

export default Categories;
