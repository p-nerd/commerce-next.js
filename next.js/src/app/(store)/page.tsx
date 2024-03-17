import type { Metadata } from "next";
import { Container } from "@/components/ui2/container";
import billboards from "@/collections/billboards";
import Billboards from "./Billboards";

export const metadata: Metadata = {
    title: "Home - Commerce",
};

const Home = async () => {
    const billboardsList = await billboards.finds();

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboards billboards={billboardsList} />
            </div>
        </Container>
    );
};

export default Home;
