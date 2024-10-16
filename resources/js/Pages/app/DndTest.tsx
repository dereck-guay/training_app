import React, { CSSProperties, useState } from 'react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table';

// needed for table body level scope DnD setup
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    type UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// needed for row & cell level scope DnD setup
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
    const { attributes, listeners } = useSortable({
        id: rowId,
    });
    return (
        // Alternatively, you could set these attributes on the rows themselves
        <button {...attributes} {...listeners}>
            <FontAwesomeIcon icon={faBars} />
        </button>
    );
};

// Row Component
const DraggableRow = ({ row }: { row: Row<Workout> }) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id.toString(),
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    };
    return (
        // connect row ref to dnd-kit, apply important styles
        <TableRow ref={setNodeRef} style={style}>
            {row.getVisibleCells().map((cell) => (
                <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
};

// Table Component
export default function DndTest({ workouts }: { workouts: Workout[] }) {
    const columns = React.useMemo<ColumnDef<Workout>[]>(
        () => [
            // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
            {
                id: 'drag-handle',
                header: 'Move',
                cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
                size: 60,
            },
            {
                accessorKey: 'datetime',
                cell: (info) => info.getValue(),
            },
        ],
        [],
    );
    const [data, setData] = useState(workouts);

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ id }) => id.toString()),
        [data],
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.id.toString(), //required because row indexes will change
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    // reorder rows after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return arrayMove(data, oldIndex, newIndex); //this is just a splice util
            });
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    );

    return (
        <div className="border rounded-md overflow-hidden">
            <DndContext
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <Table>
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
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
                            items={dataIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {table.getRowModel().rows.map((row) => (
                                <DraggableRow key={row.id} row={row} />
                            ))}
                        </SortableContext>
                    </TableBody>
                </Table>
            </DndContext>
        </div>
    );
}
