"use client";

import type { TProduct } from "@/collections/products";
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteProduct } from "./[id]/Delete";

import { CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import { DataTable, DataTableRowActions, DataTableColumnHeader } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";

import time from "@/helpers/time";
import utils from "@/helpers/utils";

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

            const { push, refresh } = useRouter();
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
                            onClick: () => push(`/admin/products/${product.id}`),
                            icon: EditIcon,
                        },
                        {
                            label: "Delete",
                            onClick: () =>
                                deleteProduct({
                                    productId: product.id,
                                    onAfterDelete: () => refresh(),
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

const Table = (p: { products: TProduct[] }) => {
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

export default Table;
