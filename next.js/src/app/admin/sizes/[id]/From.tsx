"use client";

import type { TSize } from "@/collections/sizes";

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

const schema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

const From = (p: { size: TSize | null }) => {
    const { loading, setLoading } = useSpinnerModal();
    const { push, refresh } = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: p.size?.name, value: p.size?.value },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.size) {
                await ajax.patch(`/api/sizes?id=${p.size.id}`, values);
            } else {
                await ajax.post(`/api/sizes`, values);
            }
            push(`/admin/sizes`);
            refresh();

            toast.success(p.size ? "Size updated" : "Size created");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
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
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="size name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="size value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type="submit">
                    {p.size ? "Save changes" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default From;
