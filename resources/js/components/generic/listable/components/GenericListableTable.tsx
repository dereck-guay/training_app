import { DataTable } from '@/components/dataware/DataTable';
import { useGenericListable } from './GenericListable.hook';

const GenericListableTable = () => {
    const { data, columns, editRecord, deleteRecord } = useGenericListable();

    return (
        <div>
            <DataTable
                data={data!}
                columns={columns({ editRecord, deleteRecord })}
            />
        </div>
    );
};

export default GenericListableTable;
