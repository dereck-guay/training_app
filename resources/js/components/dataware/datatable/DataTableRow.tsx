import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row, Table as TableType } from '@tanstack/react-table';

interface DataTableRowProps<TData> {
    row: Row<TData>;
    table: TableType<TData>;
    contextMenu?: (row: Row<TData>, table: TableType<TData>) => React.ReactNode;
    onRowClick?: (row: Row<TData>, table: TableType<TData>) => void;
    onRowDblClick?: (row: Row<TData>, table: TableType<TData>) => void;
    isDraggable?: boolean;
}

export function DataTableRow<TData>({
    row,
    table,
    contextMenu,
    onRowClick,
    onRowDblClick,
    isDraggable,
}: DataTableRowProps<TData>) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: row.id, // Using row.id as the unique identifier
            disabled: !isDraggable,
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDraggable ? 'grab' : 'default',
    };

    return (
        <ContextMenu key={row.id}>
            <ContextMenuTrigger asChild>
                <TableRow
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    onClick={() => onRowClick && onRowClick(row, table)}
                    onDoubleClick={() =>
                        onRowDblClick && onRowDblClick(row, table)
                    }
                >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell
                            key={cell.id}
                            className={cell.column.columnDef.meta?.className}
                        >
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            </ContextMenuTrigger>
            {contextMenu && contextMenu(row, table)}
        </ContextMenu>
    );
}
