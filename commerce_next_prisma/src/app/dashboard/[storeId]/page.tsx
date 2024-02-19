import store from "@/models/stores";

const StorePage = async (p: { params: { storeId: string } }) => {
    const storeItem = await store.find(p.params.storeId);
    return <div>Active Store: {storeItem.name}</div>;
};

export default StorePage;
