"use client";

import type { TProduct } from "@/collections/products";
import type { TCategory } from "@/collections/categories";
import type { TColor } from "@/collections/colors";
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
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui2/uploads";
import { FormCheckbox } from "@/components/ui2/form-utils";

const schema = z.object({
    name: z.string().min(1),
    images: z.object({ id: z.string().optional(), name: z.string(), path: z.string() }).array(),
    price: z.string(),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

const _Form = (p: {
    product: TProduct | null;
    categories: TCategory[];
    colors: TColor[];
    sizes: TSize[];
}) => {
    const { loading, setLoading } = useSpinnerModal();
    const { push, refresh } = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: p.product?.name,
            images:
                p.product?.images.map(image => ({
                    id: image.id,
                    name: image.name,
                    path: image.path,
                })) || [],
            price: String(p.product?.price),
            categoryId: p.product?.categoryId,
            colorId: p.product?.colorId,
            sizeId: p.product?.sizeId,
            isFeatured: p.product?.isFeatured,
            isArchived: p.product?.isArchived,
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            setLoading(true);
            if (p.product) {
                await ajax.patch(`/api/products?id=${p.product.id}`, values);
            } else {
                await ajax.post(`/api/products`, values);
                push(`/admin/products`);
            }
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
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    disabled={loading}
                                    urls={field.value ? field.value.map(x => x.path) : []}
                                    onDone={path =>
                                        field.onChange([...field.value, { path, name: path }])
                                    }
                                    onDelete={path =>
                                        field.onChange(field.value.filter(c => c.path !== path))
                                    }
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
                                        placeholder="Product Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        disabled={loading}
                                        placeholder="9.99"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger defaultValue={field.value}>
                                            <SelectValue placeholder="Select A Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {p.categories.map(category => (
                                            <SelectItem value={category.id} key={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sizeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger defaultValue={field.value}>
                                            <SelectValue placeholder="Select A Size" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {p.sizes.map(size => (
                                            <SelectItem value={size.id} key={size.id}>
                                                {size.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Featured</FormLabel>
                                <FormControl>
                                    <FormCheckbox
                                        checked={field.value}
                                        onChange={field.onChange}
                                        label="This product will appear on home page"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isArchived"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Archived</FormLabel>
                                <FormControl>
                                    <FormCheckbox
                                        checked={field.value}
                                        onChange={field.onChange}
                                        label="This product will not appear on the store"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="colorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger defaultValue={field.value}>
                                            <SelectValue placeholder="Select A Color" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {p.colors.map(color => (
                                            <SelectItem value={color.id} key={color.id}>
                                                {color.name}
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
                    {p.product ? "Save changes" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default _Form;
