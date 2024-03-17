import type { TBillboard } from "@/types/models";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ajax } from "@/lib/ajax";
import { toast } from "@/components/modals/toast-modal";
import { useSpinnerModal } from "@/components/modals/spinner-modal";
import { useDeleteBillboard } from "@/hooks/delete-hooks";
import { router } from "@inertiajs/react";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui2/typography";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui2/uploads";
import { Trash } from "lucide-react";

const schema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

const _Form = (p: { billboard: TBillboard | null }) => {
    const { loading, setLoading } = useSpinnerModal();
    const { visit, reload } = router;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { label: p.billboard?.label, imageUrl: p.billboard?.imageUrl },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.billboard) {
                await ajax.patch(`/api/billboards?id=${p.billboard.id}`, values);
            } else {
                await ajax.post(`/api/billboards`, values);
            }
            visit(`/admin/billboards`);
            reload();

            toast.success(p.billboard ? "Billboard updated" : "Billboard created");
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

const Delete = (p: { billboardId: string }) => {
    const { visit, reload } = router;
    const { pending, deleteBillboard } = useDeleteBillboard();

    return (
        <>
            <Button
                disabled={pending}
                variant="destructive"
                size="sm"
                onClick={() =>
                    deleteBillboard({
                        billboardId: p.billboardId,
                        onAfterDelete: () => {
                            visit("/admin/billboards");
                            reload();
                        },
                    })
                }
            >
                <Trash className="h-4 w-4" />
            </Button>
        </>
    );
};

const Billboard = async (p: { billboard: TBillboard | null }) => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={p.billboard ? "Edit Billboard" : "Create Billboard"}
                    description={
                        p.billboard ? "Edit a existing billboard" : "Create a new billboard"
                    }
                />
                {!!p.billboard && <Delete billboardId={p.billboard.id} />}
            </div>
            <Separator />
            <_Form billboard={p.billboard} />
        </div>
    );
};

export default Billboard;
