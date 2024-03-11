"use client";

import type { TStore } from "@/collections/stores";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { toast } from "@/components/modals/toast-modal";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
    name: z.string().min(1),
});

const From = (p: { store: TStore }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: p.store.name,
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            await ajax.patch("/api/stores", { ...values, id: p.store.id });
            router.refresh();
            toast.success("Store updated");
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Tank Store" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type="submit">
                    Save changes
                </Button>
            </form>
        </Form>
    );
};

export default From;
