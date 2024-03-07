"use client";

import type { TBillboard } from "@/collections/billboards";
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { CrossCircledIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { DataTable, DataTableActionsDropdown } from "@/components/ui2/data-table";
import { DataTableColumnHeader, DataTableFacetedFilter } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";

import time from "@/helpers/time";

const columns: ColumnDef<TBillboard>[] = [
    {
        id: "select",
        header: ({ table }) => <DataTableSelectAllCheckbox table={table} />,
        cell: ({ row }) => <DataTableSelectRowCheckbox row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Label" column={column} />,
        accessorKey: "label",
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Date" column={column} />,
        accessorKey: "date",
        accessorFn: row => time.format.day_month_year(row.createdAt),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const billboard = row.original;
            return (
                <DataTableActionsDropdown
                    actions={[
                        {
                            label: "Edit",
                            onClick: () => {
                                console.log(billboard);
                            },
                        },
                    ]}
                />
            );
        },
    },
];

const statuses = [
    {
        value: "active",
        label: "Active",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "inactive",
        label: "Inactive",
        icon: CrossCircledIcon,
    },
];

const Table = (p: { billboards: TBillboard[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: p.billboards,
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
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <DataTableFilters table={table} placeholder="Filters label..." column="label" />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                <DataTableColumnToggle table={table} />
            </div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </div>
    );
};

export default Table;
