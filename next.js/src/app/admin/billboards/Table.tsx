"use client";

import type { TBillboard } from "@/collections/billboards";
import type { ColumnDef } from "@tanstack/react-table";
import type { Table as TanStackTable } from "@tanstack/react-table";

import { Table as UITable, TableBody, TableCell } from "@/components/ui/table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import time from "@/helpers/time";

const columns: ColumnDef<TBillboard>[] = [
    {
        header: "Label",
        accessorKey: "label",
    },
    {
        header: "Date",
        accessorFn: row => time.format.day_month_year(row.createdAt),
    },
];

const DataTable = ({ table }: { table: TanStackTable<TBillboard> }) => {
    return (
        <div className="rounded-md border">
            <UITable>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </UITable>
        </div>
    );
};

const Pagination = ({ table }: { table: TanStackTable<TBillboard> }) => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    );
};

const Table = ({ billboards }: { billboards: TBillboard[] }) => {
    const table = useReactTable({ data: billboards, columns, getCoreRowModel: getCoreRowModel() });
    return (
        <div>
            <DataTable table={table} />
            <Pagination table={table} />
        </div>
    );
};

export default Table;
