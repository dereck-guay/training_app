import {
    ColumnDef,
    Row,
    Table as TableType,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ContextMenu, ContextMenuTrigger } from '../ui/context-menu';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        className: string;
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    contextMenu?: (row: Row<TData>, table: TableType<TData>) => React.ReactNode;
    onRowClick?: (row: Row<TData>, table: TableType<TData>) => void;
    onRowDblClick?: (row: Row<TData>, table: TableType<TData>) => void;
}

export function DataTable<TData, TValue>({
    data,
    columns,
    contextMenu,
    onRowClick,
    onRowDblClick,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {},
    });

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
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
                            table.getRowModel().rows.map((row) => (
                                <ContextMenu key={row.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            className={
                                                onRowClick
                                                    ? 'cursor-pointer'
                                                    : ''
                                            }
                                            onClick={
                                                onRowClick
                                                    ? () =>
                                                          onRowClick(row, table)
                                                    : undefined
                                            }
                                            onDoubleClick={
                                                onRowDblClick
                                                    ? () =>
                                                          onRowDblClick(
                                                              row,
                                                              table,
                                                          )
                                                    : undefined
                                            }
                                            data-state={
                                                row.getIsSelected() &&
                                                'selected'
                                            }
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={
                                                            cell.column
                                                                .columnDef.meta
                                                                ?.className
                                                        }
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    </ContextMenuTrigger>
                                    {contextMenu && contextMenu(row, table)}
                                </ContextMenu>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
