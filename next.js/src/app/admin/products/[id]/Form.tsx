"use client";

import type { TProduct } from "@/collections/products";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { toast } from "@/components/modals/toast-modal";
import { useSpinnerModal } from "@/components/modals/spinner-modal";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui2/uploads";

const schema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().optional(),
});

const _Form = (p: { product: TProduct | null }) => {
    const { loading, setLoading } = useSpinnerModal();
    const { push, refresh } = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: p.product?.name, imageUrl: "" },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.product) {
                await ajax.patch(`/api/products?id=${p.product.id}`, values);
            } else {
                await ajax.post(`/api/products`, values);
            }
            push(`/admin/products`);
            refresh();

            toast.success(p.product ? "Product updated" : "Product created");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="product name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type="submit">
                    {p.product ? "Save changes" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default _Form;
