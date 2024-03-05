"use client";

import type { TBillboard } from "@/collections/billboards";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui2/ImageUpload";

const schema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

const From = (p: { billboard: TBillboard | null; storeId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { label: p.billboard?.label, imageUrl: p.billboard?.imageUrl },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.billboard) {
                await ajax.patch(`/api/${p.storeId}/billboards?id=${p.billboard.id}`, values);
            } else {
                await ajax.post(`/api/${p.storeId}/billboards`, values);
            }
            router.refresh();
            toast.success(p.billboard ? "Billboard updated" : "Billboard created");
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    disabled={loading}
                                    onDelete={() => field.onChange("")}
                                    onDone={url => field.onChange(url)}
                                    urls={field.value ? [field.value] : []}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="billboard label"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type="submit">
                    {p.billboard ? "Save changes" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default From;