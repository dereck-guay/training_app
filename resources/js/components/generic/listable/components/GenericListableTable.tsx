import { DataTable } from '@/components/dataware/datatable/DataTable';
import { useState } from 'react';
import { useGenericListable } from './GenericListable.hook';

const GenericListableTable = () => {
    const { data, columns, editRecord, deleteRecord } = useGenericListable();
    const [tableData, setTableData] = useState(data);

    return (
        <div>
            <DataTable
                onDragEnds={(newData) => setTableData(newData)}
                isDraggable
                data={tableData!}
                columns={columns({ editRecord, deleteRecord })}
            />
        </div>
    );
};

export default GenericListableTable;
