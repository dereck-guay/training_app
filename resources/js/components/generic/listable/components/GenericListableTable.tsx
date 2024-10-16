import { DataTable } from '@/components/dataware/datatable/DataTable';
import { useState } from 'react';
import { useGenericListable } from './GenericListable.hook';

const GenericListableTable = () => {
    const { data, getRowId, columns, editRecord, deleteRecord } =
        useGenericListable();
    const [tableData, setTableData] = useState(data);

    return (
        <div>
            <DataTable
                data={tableData!}
                getRowId={getRowId}
                columns={columns({ editRecord, deleteRecord })}
            />
        </div>
    );
};

export default GenericListableTable;
