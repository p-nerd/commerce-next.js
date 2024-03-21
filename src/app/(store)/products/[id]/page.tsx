import type { TImage } from "@/collections/images";

import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui2/container";

import products from "@/collections/products";

import ProductCards from "@/components/pisces/product-cards";

const Gallery = (p: { data: TImage[] }) => {
    return <></>;
};

const Product = async (p: { params: { id: string } }) => {
    const product = await products.find(p.params.id);
    if (!product) {
        notFound();
    }

    const relatedProducts = await products.findsForProductCard({
        categoryId: product.categoryId,
        take: 4,
    });

    return (
        <>
            <Container className="px-4 py-10 sm:px-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:px-8">
                <Gallery data={product.images} />
            </Container>
            <Separator className="my-10" />
            <Container>
                <ProductCards title="Related Products" data={relatedProducts} />
            </Container>
        </>
    );
};

export default Product;
