import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = ({ rows = 10 }: { rows?: number }) => {
    return (
        <div className="flex flex-col space-y-3 p-8">
            <Skeleton className="h-28" />
            {Array.from({ length: rows }).map((_, index) => (
                <Skeleton className="h-14" key={index} />
            ))}
        </div>
    );
};
