import { DataTable } from '@/components/dataware/datatable/DataTable';
import { Button } from '@/components/ui/button';
import Link from '@/components/ui/link';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSplitsPage } from '../page.hook';

const SplitsTable = () => {
    const { splits, editSplit, deleteSplit } = useSplitsPage();

    return (
        <div>
            <DataTable
                data={splits}
                getId={(split) => split.id.toString()}
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
                    {
                        header: '',
                        accessorKey: 'id',
                        meta: {
                            className: 'py-0 w-1',
                        },
                        cell: ({ row }) => {
                            return (
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="h-7 px-2 rounded-sm"
                                        onClick={() => editSplit(row.original)}
                                    >
                                        <FontAwesomeIcon
                                            className="size-[0.8rem]"
                                            icon={faPencilAlt}
                                        />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="h-7 px-2 rounded-sm"
                                        variant={'destructive'}
                                        onClick={() =>
                                            deleteSplit(row.original)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            className="size-3"
                                            icon={faTrashAlt}
                                        />
                                    </Button>
                                </div>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

export default SplitsTable;
