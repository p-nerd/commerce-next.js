"use client";

import type { TColor } from "@/collections/colors";

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
    value: z.string().min(4).max(9).regex(/^#/, "String must be a valid color hex code"),
});

const _Form = (p: { color: TColor | null }) => {
    const { loading, setLoading } = useSpinnerModal();
    const { push, refresh } = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: p.color?.name, value: p.color?.value },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.color) {
                await ajax.patch(`/api/colors?id=${p.color.id}`, values);
            } else {
                await ajax.post(`/api/colors`, values);
            }
            push(`/admin/colors`);
            refresh();

            toast.success(p.color ? "Color updated" : "Color created");
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
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="color name" {...field} />
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
                                    <div className="flex items-center gap-4">
                                        <Input
                                            maxLength={9}
                                            disabled={loading}
                                            placeholder="Example: #9f66e2"
                                            {...field}
                                        />
                                        <div
                                            className="rounded-full border border-gray-200 p-4 dark:border-gray-800"
                                            style={{ backgroundColor: field.value }}
                                        ></div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type="submit">
                    {p.color ? "Save changes" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default _Form;
