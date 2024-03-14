"use client";

import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";
import type { TColor } from "@/collections/colors";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteColor } from "./[id]/Delete";

import { CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import { DataTable, DataTableRowActions, DataTableColumnHeader } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";

import time from "@/helpers/time";
import utils from "@/helpers/utils";

const columns: ColumnDef<TColor>[] = [
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
        header: ({ column }) => <DataTableColumnHeader title="Value" column={column} />,
        accessorKey: "value",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <div
                    className="h-6 w-6 rounded-full border border-gray-200 dark:border-gray-800"
                    style={{ backgroundColor: row.original.value }}
                ></div>
                <div>{row.original.value}</div>
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
            const color = row.original;

            const { push, refresh } = useRouter();
            const { pending, deleteColor } = useDeleteColor();

            return (
                <DataTableRowActions
                    actions={[
                        {
                            label: "Copy ID",
                            onClick: () => utils.copy(color.id, "Color ID"),
                            icon: CopyIcon,
                        },
                        {
                            label: "Edit",
                            onClick: () => push(`/admin/colors/${color.id}`),
                            icon: EditIcon,
                        },
                        {
                            label: "Delete",
                            onClick: () =>
                                deleteColor({
                                    colorId: color.id,
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

const Table = (p: { colors: TColor[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: p.colors,
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
