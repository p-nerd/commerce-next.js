import { prisma } from "@/lib/prisma";

const StorePage = async (p: { params: { storeId: string } }) => {
    const store = await prisma().store.findFirst({
        where: {
            id: p.params.storeId,
        },
    });

    return <div>Active Store: {store?.name}</div>;
};

export default StorePage;
