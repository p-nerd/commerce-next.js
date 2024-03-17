import type { Metadata } from "next";
import { Heading } from "@/components/ui2/typography";
import orders from "@/collections/orders";
import Table from "./Table";

export const metadata: Metadata = {
    title: "Orders - Commerce Admin",
};

const Orders = async () => {
    const ordersList = await orders.finds();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <Heading
                    title={`orders (${ordersList.length})`}
                    description="Manage orders for your store"
                />
                <Table orders={ordersList} />
            </div>
        </div>
    );
};

export default Orders;
