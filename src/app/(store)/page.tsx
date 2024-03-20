import type { Metadata } from "next";

import { Container } from "@/components/ui2/container";

import billboards from "@/collections/billboards";

import Billboards from "./Billboards";

export const metadata: Metadata = {
    title: "Home - Commerce",
};

const Home = async () => {
    const bList = await billboards.finds();

    return (
        <Container className="space-y-10 pb-10">
            <Billboards data={bList.map(({ id, label, imageUrl }) => ({ id, label, imageUrl }))} />
        </Container>
    );
};

export default Home;
