import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    ColumnDef,
    Row,
    Table as TableType,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { DataTableRow } from './DataTableRow';

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
    isDraggable?: boolean; // Enable/disable draggable
    onDragEnds?: (newData: TData[]) => void; // Callback for updated data
}

export function DataTable<TData, TValue>({
    data,
    columns,
    contextMenu,
    onRowClick,
    onRowDblClick,
    isDraggable = false,
    onDragEnds,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {},
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // If dropped outside of any droppable area, do nothing
        if (!over) return;

        const activeIndex = table
            .getRowModel()
            .rows.findIndex((item) => item.id === active.id);
        const overIndex = table
            .getRowModel()
            .rows.findIndex((item) => item.id === over.id);

        // If active and over indexes are the same, do nothing
        if (activeIndex === overIndex) return;

        // Clone the data array and move the item
        const newData = [...data];
        const [movedItem] = newData.splice(activeIndex, 1);
        newData.splice(overIndex, 0, movedItem);

        // Call the callback to update the data in the parent component
        if (onDragEnds) onDragEnds(newData);
    };

    return (
        <DndContext
            onDragEnd={isDraggable ? handleDragEnd : undefined}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={table.getRowModel().rows.map((row) => row.id)}
                strategy={verticalListSortingStrategy} // Only allow vertical dragging
            >
                <div className="w-full">
                    <div className="rounded-md border">
                        <Table className="text-md">
                            <TableHeader className="bg-secondary">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
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
                                                contextMenu={contextMenu}
                                                onRowClick={onRowClick}
                                                onRowDblClick={onRowDblClick}
                                                isDraggable={isDraggable}
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
            </SortableContext>
        </DndContext>
    );
}
