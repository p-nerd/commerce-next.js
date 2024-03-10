import { SkeletonTable } from "@/components/ui2/skeletons";

const Loading = () => {
    return (
        <div className="p-8">
            <SkeletonTable rows={12} />
        </div>
    );
};

export default Loading;
