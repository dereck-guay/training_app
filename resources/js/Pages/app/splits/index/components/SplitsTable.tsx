import { DataTable } from '@/components/dataware/DataTable';
import Link from '@/components/ui/link';
import { useSplitsContext } from '../page.hook';

const SplitsTable = () => {
    const splits = useSplitsContext();

    return (
        <div>
            <DataTable
                data={splits}
                columns={[
                    {
                        header: 'Name',
                        accessorKey: 'name',
                        cell: ({ row }) => {
                            return (
                                <Link
                                    href={route('splits.show', {
                                        split: row.original.id,
                                    })}
                                >
                                    {row.original.name}
                                </Link>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

export default SplitsTable;
