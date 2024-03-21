import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProductNotFound = () => {
    return (
        <div className="flex flex-col items-center py-32">
            <div className="text-center text-2xl">404 | The product is not found</div>
            <Link
                href="/products"
                className={cn(buttonVariants({ variant: "link", size: "lg" }), "text-blue-500")}
            >
                Go to products page
            </Link>
        </div>
    );
};

export default ProductNotFound;
