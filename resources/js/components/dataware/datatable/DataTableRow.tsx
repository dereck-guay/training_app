import { TableCell, TableRow } from '@/components/ui/table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { CSSProperties } from 'react';

interface DataTableRowProps<TData> {
    row: Row<TData>;
    table: Table<TData>;
    onRowClick?: (row: Row<TData>, table: Table<TData>) => void;
    onRowDblClick?: (row: Row<TData>, table: Table<TData>) => void;
}

const DataTableRow = <TData,>({
    row,
    table,
    onRowClick,
    onRowDblClick,
}: DataTableRowProps<TData>) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.id,
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    };

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            onClick={() => onRowClick && onRowClick(row, table)}
            onDoubleClick={() => onRowDblClick && onRowDblClick(row, table)}
        >
            {row.getVisibleCells().map((cell) => {
                return (
                    <TableCell
                        key={cell.id}
                        className={cell.column.columnDef.meta?.className}
                    >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                        )}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default DataTableRow;
