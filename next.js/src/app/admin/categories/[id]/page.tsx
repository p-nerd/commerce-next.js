import type { TCategory } from "@/collections/categories";

import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import categories from "@/collections/categories";
import billboards from "@/collections/billboards";

import From from "./From";
import Delete from "./Delete";

const Category = async (p: { params: { id: string } }) => {
    let category: TCategory | null = null;
    if (p.params.id !== "new") {
        category = await categories.find(p.params.id);
        if (!category) {
            notFound();
        }
    }

    const billboardsList = await billboards.finds();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={category ? "Edit Category" : "Create Category"}
                    description={category ? "Edit a existing Category" : "Create a new Category"}
                />
                {!!category && <Delete categoryId={category.id} />}
            </div>
            <Separator />
            <From category={category} billboards={billboardsList} />
        </div>
    );
};

export default Category;
