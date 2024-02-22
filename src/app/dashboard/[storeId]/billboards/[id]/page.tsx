import billboards from "@/collections/billboards";
import From from "./From";

const Billboard = async (p: { params: { id: string } }) => {
    const billboard = await billboards.find(p.params.id);

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <From billboard={billboard} />
        </div>
    );
};

export default Billboard;
