import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = ({ rows = 10 }: { rows?: number }) => {
    return (
        <div className="flex flex-col space-y-3 p-8">
            <Skeleton className="h-24" />
            {Array.from({ length: rows }).map((_, index) => (
                <Skeleton className="h-14" key={index} />
            ))}
        </div>
    );
};

export default function Loading() {
    return <SkeletonTable rows={12} />;
}
