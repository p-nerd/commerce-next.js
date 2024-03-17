import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="flex flex-col space-y-4 p-8">
            <Skeleton className="h-16" />
            <Skeleton className="h-52 w-52" />
            <Skeleton className="h-12 w-52" />
            <Skeleton className="h-12 w-[430px]" />
            <Skeleton className="h-12 w-52" />
        </div>
    );
};

export default Loading;
