import { DataTable } from '@/components/dataware/datatable/DataTable';
import { useGenericListable } from './GenericListable.hook';

const GenericListableTable = () => {
    const { data, getId, onDragEnd, columns, editRecord, deleteRecord } =
        useGenericListable();

    return (
        <div>
            <DataTable
                data={data!}
                getId={getId}
                columns={columns({ editRecord, deleteRecord })}
                onDragEnd={onDragEnd}
            />
        </div>
    );
};

export default GenericListableTable;
