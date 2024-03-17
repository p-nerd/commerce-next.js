import type { TProduct } from "@/types/models";
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteProduct } from "@/hooks/delete-hooks";
import { router } from "@inertiajs/react";

import time from "@/helpers/time";
import utils from "@/helpers/utils";

import { Link } from "@inertiajs/react";
import { Plus, CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import { DataTable, DataTableRowActions, DataTableColumnHeader } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";
import { Heading } from "@/components/ui2/typography";

const columns: ColumnDef<TProduct>[] = [
    {
        id: "select",
        header: ({ table }) => <DataTableSelectAllCheckbox table={table} />,
        cell: ({ row }) => <DataTableSelectRowCheckbox row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Name" column={column} />,
        accessorKey: "name",
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Featured" column={column} />,
        accessorKey: "isFeatured",
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Archived" column={column} />,
        accessorKey: "isArchived",
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Price" column={column} />,
        accessorKey: "price",
        accessorFn: row => utils.number_formatter.format(row.price),
    },
    {
        header: "Category",
        accessorFn: row => row.category.name,
    },
    {
        header: "Size",
        accessorFn: row => row.size.name,
    },
    {
        header: "Color",
        accessorKey: "color",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <div
                    className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-800"
                    style={{ backgroundColor: row.original.color.value }}
                ></div>
                <div>{row.original.color.value}</div>
            </div>
        ),
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Date" column={column} />,
        accessorKey: "date",
        sortingFn: (a, b) => a.original.createdAt.getTime() - b.original.createdAt.getTime(),
        accessorFn: row => time.format.day_month_year(row.createdAt),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: function Actions({ row }) {
            const product = row.original;

            const { visit, reload } = router;
            const { pending, deleteProduct } = useDeleteProduct();

            return (
                <DataTableRowActions
                    actions={[
                        {
                            label: "Copy ID",
                            onClick: () => utils.copy(product.id, "Billboard ID"),
                            icon: CopyIcon,
                        },
                        {
                            label: "Edit",
                            onClick: () => visit(`/admin/products/${product.id}`),
                            icon: EditIcon,
                        },
                        {
                            label: "Delete",
                            onClick: () =>
                                deleteProduct({
                                    productId: product.id,
                                    onAfterDelete: () => reload(),
                                }),
                            icon: DeleteIcon,
                            disabled: pending,
                        },
                    ]}
                />
            );
        },
    },
];

const _Table = (p: { products: TProduct[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: p.products,
        columns: columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex items-center gap-2">
                <DataTableFilters table={table} placeholder="Filters name..." column="name" />
                <DataTableColumnToggle table={table} />
            </div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </div>
    );
};

const Products = (p: { products: TProduct[] }) => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Products (${p.products.length})`}
                        description="Manage products for your store"
                    />
                    <Link href="/admin/products/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <_Table products={p.products} />
            </div>
        </div>
    );
};

export default Products;
