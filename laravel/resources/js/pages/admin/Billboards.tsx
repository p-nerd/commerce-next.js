import { buttonVariants } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Heading } from "@/components/ui2/typography";

import { TBillboard } from "@/types/models";
import { Link, router } from "@inertiajs/react";

import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteBillboard } from "@/hooks/delete-hooks";

import { CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import { DataTable, DataTableRowActions, DataTableColumnHeader } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";

import time from "@/helpers/time";
import utils from "@/helpers/utils";

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
        sortingFn: (a, b) => a.original.createdAt.getTime() - b.original.createdAt.getTime(),
        accessorFn: row => time.format.day_month_year(row.createdAt),
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Status" column={column} />,
        accessorKey: "status",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: function Actions({ row }) {
            const billboard = row.original;

            const { visit, reload } = router;
            const { pending, deleteBillboard } = useDeleteBillboard();

            return (
                <DataTableRowActions
                    actions={[
                        {
                            label: "Copy ID",
                            onClick: () => utils.copy(billboard.id, "Billboard ID"),
                            icon: CopyIcon,
                        },
                        {
                            label: "Edit",
                            onClick: () => visit(`/admin/billboards/${billboard.id}`),
                            icon: EditIcon,
                        },
                        {
                            label: "Delete",
                            onClick: () =>
                                deleteBillboard({
                                    billboardId: billboard.id,
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
        <div className="flex w-full flex-col gap-5">
            <div className="flex items-center gap-2">
                <DataTableFilters table={table} placeholder="Filters label..." column="label" />
                <DataTableColumnToggle table={table} />
            </div>
            <DataTable table={table} />
            <DataTablePagination table={table} />
        </div>
    );
};

const Billboards = async (p: { billboards: TBillboard }) => {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col space-y-8 overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow-md md:shadow-xl">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Billboards (${p.billboards.length})`}
                        description="Manage billboards for your store"
                    />
                    <Link href="/admin/billboards/new" className={buttonVariants()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Link>
                </div>
                <Table billboards={p.billboards} />
            </div>
        </div>
    );
};

export default Billboards;
