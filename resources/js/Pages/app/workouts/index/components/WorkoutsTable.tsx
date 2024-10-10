import Link from '@/components/ui/link';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { DataTable } from '../../../../../components/dataware/DataTable';
import { useWorkoutsContext } from '../page.hook';

const WorkoutsTable = () => {
    const workouts = useWorkoutsContext();

    function handleRowClick(workout: Workout) {
        router.visit(
            route('workouts.show', {
                workout: workout.id,
            }),
        );
    }

    return (
        <div>
            <DataTable
                data={workouts}
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
                        cell: ({ row }) => `${row.original.calories} calories`,
                    },
                    {
                        header: 'Time (mins)',
                        accessorKey: 'time',
                        cell: ({ row }) => `${row.original.time} minutes`,
                    },
                ]}
            />
        </div>
    );
};

export default WorkoutsTable;
