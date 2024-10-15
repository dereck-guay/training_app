import { Button } from '@/components/ui/button';
import Link from '@/components/ui/link';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { DataTable } from '../../../../../components/dataware/datatable/DataTable';
import { useWorkoutsContext } from '../page.hook';

const WorkoutsTable = () => {
    const { workouts, editWorkout, deleteWorkout } = useWorkoutsContext();
    return (
        <div>
            <DataTable
                data={workouts!}
                columns={[
                    {
                        header: 'Date',
                        accessorKey: 'datetime',
                        cell: ({ row }) => {
                            return (
                                <Link
                                    href={route('workouts.show', {
                                        workout: row.original.id,
                                    })}
                                >
                                    {format(row.original.datetime, 'PP')}
                                </Link>
                            );
                        },
                    },
                    {
                        header: 'Split',
                        accessorKey: 'split.name',
                        cell: ({ row }) => {
                            if (!row.original.split) {
                                return 'No Split';
                            }

                            return (
                                <Link
                                    href={route('splits.show', {
                                        split: row.original.split?.id,
                                    })}
                                >
                                    {row.original.split?.name}
                                </Link>
                            );
                        },
                    },
                    {
                        header: 'Calories',
                        accessorKey: 'calories',
                        cell: ({ row }) => {
                            if (!row.original.calories) {
                                return '-';
                            }

                            return `${row.original.calories} calories`;
                        },
                    },
                    {
                        header: 'Time',
                        accessorKey: 'time',
                        cell: ({ row }) => {
                            if (!row.original.time) {
                                return '-';
                            }

                            return `${row.original.time} minutes`;
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
                                        onClick={() =>
                                            editWorkout(row.original)
                                        }
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
                                            deleteWorkout(row.original)
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

export default WorkoutsTable;
