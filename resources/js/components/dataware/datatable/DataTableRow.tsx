import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { WithId } from './DataTable';

interface DataTableRowProps<TData> {
    row: Row<WithId<TData>>;
    table: Table<WithId<TData>>;
    onRowClick?: (row: Row<WithId<TData>>, table: Table<WithId<TData>>) => void;
    onRowDblClick?: (
        row: Row<WithId<TData>>,
        table: Table<WithId<TData>>,
    ) => void;
    contextMenu?: (
        row: Row<WithId<TData>>,
        table: Table<WithId<TData>>,
    ) => React.ReactNode;
}

const DataTableRow = <TData,>({
    row,
    table,
    onRowClick,
    onRowDblClick,
    contextMenu,
}: DataTableRowProps<TData>) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <TableRow
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
};

export default DataTableRow;
