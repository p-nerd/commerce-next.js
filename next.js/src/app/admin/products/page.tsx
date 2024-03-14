import { buttonVariants } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Heading } from "@/components/ui2/typography";

import products from "@/collections/products";

import Link from "next/link";
import Table from "./Table";

const Products = async () => {
    const productsList = await products.finds();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Products (${productsList.length})`}
                        description="Manage products for your store"
                    />
                    <Link href="/admin/products/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <Table products={productsList} />
            </div>
        </div>
    );
};

export default Products;
