import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="flex flex-col gap-8 p-8">
            <Skeleton className="h-16" />
            <Skeleton className="h-32 w-52" />
            <div className="flex gap-8">
                <Skeleton className="h-12 w-[430px]" />
                <Skeleton className="h-12 w-[430px]" />
                <Skeleton className="h-12 w-[430px]" />
            </div>
            <div className="flex gap-8">
                <Skeleton className="h-12 w-[430px]" />
                <Skeleton className="h-12 w-[430px]" />
                <Skeleton className="h-12 w-[430px]" />
            </div>
            <div className="flex gap-8">
                <Skeleton className="h-12 w-[430px]" />
            </div>
            <Skeleton className="h-10 w-52" />
        </div>
    );
};

export default Loading;
