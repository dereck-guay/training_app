import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    Table as TableType,
    useReactTable,
} from '@tanstack/react-table';
import DataTableRow from './DataTableRow';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        className: string;
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    getRowId?: (record: TData) => string;
    contextMenu?: (row: Row<TData>, table: TableType<TData>) => React.ReactNode;
    onRowClick?: (row: Row<TData>, table: TableType<TData>) => void;
    onRowDblClick?: (row: Row<TData>, table: TableType<TData>) => void;
}

export function DataTable<TData, TValue>({
    data,
    getRowId,
    columns,
    contextMenu,
    onRowClick,
    onRowDblClick,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: getRowId,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table className="text-md overflow-hidden">
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table
                                .getRowModel()
                                .rows.map((row) => (
                                    <DataTableRow
                                        key={row.id}
                                        row={row}
                                        table={table}
                                        onRowClick={onRowClick}
                                        onRowDblClick={onRowDblClick}
                                        contextMenu={contextMenu}
                                    />
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
