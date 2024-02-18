"use client";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useStoreModel } from "@/components/modals/store-modal";
import { useState } from "react";

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput } from "@/components/ui/command";
import { CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Store } from "@prisma/client";

const StoreSwitcher = (p: { stores: Store[] }) => {
    const params = useParams();
    const router = useRouter();
    const storeModal = useStoreModel();

    const [open, setOpen] = useState(false);

    const currentStore = p.stores.find(s => s.id === params.storeId);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between")}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.name}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {p.stores.map(store => (
                                <CommandItem
                                    key={store.id}
                                    value={store.id}
                                    onSelect={() => {
                                        setOpen(false);
                                        router.push(`/dashboard/${store.id}`);
                                    }}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.name}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.id === store.id
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.setOpen(true);
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StoreSwitcher;
