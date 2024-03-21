import type { Metadata } from "next";

import { Container } from "@/components/ui2/container";

import products from "@/collections/products";
import billboards from "@/collections/billboards";

import Billboards from "./Billboards";
import ProductCards from "@/components/pisces/product-cards";

export const metadata: Metadata = {
    title: "Home - Commerce",
};

const Home = async () => {
    const bList = await billboards.finds();
    const pList = await products.findsForProductCard({ isFeatured: true });

    return (
        <Container className="space-y-10 pb-10">
            <Billboards data={bList.map(({ id, label, imageUrl }) => ({ id, label, imageUrl }))} />
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductCards title="Featured Products" data={pList} />
            </div>
        </Container>
    );
};

export default Home;
