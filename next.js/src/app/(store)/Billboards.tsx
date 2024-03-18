"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

type TDisplayBillboard = {
    id: string;
    imageUrl: string;
    label: string;
};

const Billboard = (p: { data: TDisplayBillboard }) => {
    return (
        <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
            <div
                style={{ backgroundImage: `url(${p.data?.imageUrl})` }}
                className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]"
            >
                <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
                    <div className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl">
                        {p.data.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Billboards = (p: { data: TDisplayBillboard[] }) => {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {p.data.map((displayBillboard, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Billboard data={displayBillboard} />
                        </div>
                        <div className="flex justify-center gap-1">
                            {Array.from({ length: p.data.length }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn("h-2 w-2 rounded-full bg-muted-foreground", {
                                        "bg-foreground": index === i,
                                    })}
                                />
                            ))}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default Billboards;
