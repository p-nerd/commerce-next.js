"use client";

import type { ReactElement } from "react";

import utils from "@/helpers/utils";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const IconButton = (p: { icon: ReactElement; onClick: () => void }) => {
    return (
        <Button
            onClick={p.onClick}
            size="icon"
            variant="outline"
            className="rounded-lg bg-white dark:bg-black "
        >
            {p.icon}
        </Button>
    );
};

export type TProductCardData = {
    id: string;
    images: { name: string; path: string }[];
    name: string;
    price: number;
    category: {
        name: string;
    };
};

const ProductCard = (p: { data: TProductCardData }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/products/${p.data.id}`)}
            className="group cursor-pointer space-y-4 rounded-xl border bg-white p-3 dark:bg-black"
        >
            <div className="relative aspect-square rounded-xl bg-gray-100 dark:bg-gray-900">
                <Image src={p.data.images[0].path} alt={p.data.images[0].name} fill={true} />
                <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
                    <div className="flex justify-center gap-x-6">
                        <IconButton
                            icon={<Expand size={20} className="text-gray-600 dark:text-gray-300" />}
                            onClick={() => {}}
                        />
                        <IconButton
                            icon={
                                <ShoppingCart
                                    size={20}
                                    className="text-gray-600 dark:text-gray-300"
                                />
                            }
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg font-semibold">{p.data.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{p.data.category.name}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="font-semibold">{utils.number_formatter.format(p.data.price)}</div>;
            </div>
        </div>
    );
};

export default ProductCard;
