"use client";

import type { TOrder } from "@/collections/orders";
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { toast } from "@/components/modals/toast-modal";
import { useDeleteModal } from "@/components/modals/delete-modal";

import { CopyIcon, DeleteIcon } from "lucide-react";
import { DataTable, DataTableRowActions, DataTableColumnHeader } from "@/components/ui2/data-table";
import { DataTableColumnToggle, DataTableSelectRowCheckbox } from "@/components/ui2/data-table";
import { DataTablePagination, DataTableFilters } from "@/components/ui2/data-table";
import { DataTableSelectAllCheckbox } from "@/components/ui2/data-table";

import time from "@/helpers/time";
import utils from "@/helpers/utils";
import ajax from "@/lib/ajax";

const useDeleteOrder = () => {
    const { pending, setDescription, setOnConfirm, setPending, setOpen } = useDeleteModal();

    const deleteOrder = (a: { orderId: string; onAfterDelete?: () => void }) => {
        setDescription("This action cannot be undone. This will permanently delete this order.");
        setOnConfirm(async () => {
            try {
                setPending(true);
                await ajax.delete(`/api/orders?id=${a.orderId}`);
                setOpen(false);
                a.onAfterDelete && a.onAfterDelete();
                toast.success("Order deleted successfully");
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.message || error?.message || "Something went wrong",
                );
            } finally {
                setPending(false);
            }
        });
        setOpen(true);
    };

    return { pending, deleteOrder };
};

const calOrderTotalPrice = (order: TOrder) => {
    return order.orderItems.reduce((sum, orderItem) => sum + orderItem.product.price, 0);
};

const columns: ColumnDef<TOrder>[] = [
    {
        id: "select",
        header: ({ table }) => <DataTableSelectAllCheckbox table={table} />,
        cell: ({ row }) => <DataTableSelectRowCheckbox row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: "Products",
        accessorFn: row => row.orderItems.map(oi => oi.product.name).join(", "),
    },
    {
        header: "Phone",
        accessorKey: "phone",
    },
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader title="Total Price" column={column} />,
        accessorFn: order => utils.number_formatter.format(calOrderTotalPrice(order)),
        sortingFn: (a, b) => calOrderTotalPrice(a.original) - calOrderTotalPrice(b.original),
    },
    {
        header: ({ column }) => <DataTableColumnHeader title="Is Paid" column={column} />,
        accessorKey: "isPaid",
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
            const order = row.original;

            const { refresh } = useRouter();
            const { pending, deleteOrder } = useDeleteOrder();

            return (
                <DataTableRowActions
                    actions={[
                        {
                            label: "Copy ID",
                            onClick: () => utils.copy(order.id, "Order ID"),
                            icon: CopyIcon,
                        },
                        {
                            label: "Delete",
                            onClick: () =>
                                deleteOrder({
                                    orderId: order.id,
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

const Table = (p: { orders: TOrder[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: p.orders,
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
