import type { TProduct } from "@/collections/products";

import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";

import products from "@/collections/products";

import Form from "./Form";
import Delete from "./Delete";

const Product = async (p: { params: { id: string } }) => {
    let product: TProduct | null = null;
    if (p.params.id !== "new") {
        product = await products.find(p.params.id);
        if (!product) {
            notFound();
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={product ? "Edit Product" : "Create Product"}
                    description={product ? "Edit a existing product" : "Create a new product"}
                />
                {!!product && <Delete productId={product.id} />}
            </div>
            <Separator />
            <Form product={product} />
        </div>
    );
};

export default Product;
