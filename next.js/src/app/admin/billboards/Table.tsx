"use client";

import type { TBillboard } from "@/collections/billboards";
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useDeleteModal } from "@/components/modals/delete-modal";

import { CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import { DataTable, DataTableRowActions, DataTableColumnHeader } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";

import ajax from "@/lib/ajax";
import time from "@/helpers/time";
import utils from "@/helpers/utils";
import toast from "react-hot-toast";

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
        header: ({ column }) => <DataTableColumnHeader title="Status" column={column} />,
        accessorKey: "status",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: function Actions({ row }) {
            const router = useRouter();
            const billboard = row.original;
            const deleteModal = useDeleteModal();
            return (
                <DataTableRowActions
                    actions={[
                        {
                            label: "Copy ID",
                            onClick: () => utils.copy(billboard.id, "Billboard id"),
                            icon: CopyIcon,
                        },
                        {
                            label: "Edit",
                            onClick: () => router.push(`/admin/billboards/${billboard.id}`),
                            icon: EditIcon,
                        },
                        {
                            label: "Delete",
                            onClick: () => {
                                deleteModal.setOnConfirm(async () => {
                                    await ajax.delete(`/api/billboards?id=${billboard.id}`);
                                    toast.success("Billboard deleted successfully");
                                    deleteModal.setOpen(false);
                                    router.refresh();
                                });
                                deleteModal.setOpen(true);
                            },
                            icon: DeleteIcon,
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

export default Table;
