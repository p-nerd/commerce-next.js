import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="flex flex-col gap-4 p-8">
            <Skeleton className="h-16" />
            <div className="flex gap-4">
                <Skeleton className="h-12 w-[430px]" />
                <Skeleton className="h-12 w-[430px]" />
            </div>
            <Skeleton className="h-12 w-52" />
        </div>
    );
};

export default Loading;
