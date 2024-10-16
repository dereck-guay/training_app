import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useIsMounted from '@/hooks/useIsMounted';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    Table as TableType,
    useReactTable,
} from '@tanstack/react-table';
import useDataTable from './DataTable.hook';
import DataTableRow from './DataTableRow';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        className: string;
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    getId: (record: TData) => string;
    contextMenu?: (row: Row<TData>, table: TableType<TData>) => React.ReactNode;
    onRowClick?: (row: Row<TData>, table: TableType<TData>) => void;
    onRowDblClick?: (row: Row<TData>, table: TableType<TData>) => void;
    onDragEnd?: (data: TData[]) => void;
}

export function DataTable<TData, TValue>({
    data: initialData,
    getId,
    columns,
    onRowClick,
    onRowDblClick,
    onDragEnd,
}: DataTableProps<TData, TValue>) {
    const { data, dataIds, sensors, handleDragEnd } = useDataTable({
        initialData,
        getId,
        onDragEnd,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: getId,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    if (!useIsMounted()) return null;

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <DndContext
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                >
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
                            <SortableContext
                                key={dataIds.join('-')}
                                items={dataIds}
                                strategy={verticalListSortingStrategy}
                            >
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
                                            />
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length}>
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </SortableContext>
                        </TableBody>
                    </Table>
                </DndContext>
            </div>
        </div>
    );
}
