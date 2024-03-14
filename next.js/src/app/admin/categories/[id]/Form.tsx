"use client";

import type { TCategory } from "@/collections/categories";
import type { TBillboard } from "@/collections/billboards";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ajax } from "@/lib/ajax";
import { useRouter } from "next/navigation";
import { toast } from "@/components/modals/toast-modal";
import { useSpinnerModal } from "@/components/modals/spinner-modal";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
    name: z.string().min(1),
    billboardId: z.string(),
});

const _Form = (p: { category: TCategory | null; billboards: TBillboard[] }) => {
    const { loading, setLoading } = useSpinnerModal();
    const { push, refresh } = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: p.category?.name, billboardId: p.category?.billboardId },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.category) {
                await ajax.patch(`/api/categories?id=${p.category.id}`, values);
            } else {
                await ajax.post(`/api/categories`, values);
            }
            push(`/admin/categories`);
            refresh();

            toast.success(p.category ? "Category updated" : "Category created");
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
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="category name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="billboardId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger defaultValue={field.value}>
                                            <SelectValue placeholder="Select A Billboard" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {p.billboards.map(billboard => (
                                            <SelectItem value={billboard.id} key={billboard.id}>
                                                {billboard.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type="submit">
                    {p.category ? "Save changes" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default _Form;
