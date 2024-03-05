"use client";

import { create } from "zustand";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ajax } from "@/lib/ajax";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Modal from "@/components/together/Modal";

export const useStoreModal = create<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>(set => ({
    open: false,
    setOpen: open => {
        set(s => ({ ...s, open: open }));
    },
}));

const schema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const [loading, setLoading] = useState(false);

    const { open, setOpen } = useStoreModal();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            const response = await ajax.post("/api/stores", values);
            window.location.assign(`/dashboard/${response.data.id}`);
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            title="Create Store"
            description="Add new store to manage products and categories"
            onClose={() => setOpen(false)}
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="py-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Tank Store"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end space-x-2 pt-6">
                            <Button
                                disabled={loading}
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button disabled={loading} type="submit">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};