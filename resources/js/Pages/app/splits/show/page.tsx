import GenericListable from '@/components/generic/listable/GenericListable';
import { Button } from '@/components/ui/button';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import DayForm from './components/DayForm';

interface SplitShowPageProps {
    split: Split;
    days: Day[];
}

const SplitShowPage: FC<SplitShowPageProps> = ({ split, days }) => (
    <div>
        <Head title={split.name} />

        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-full">
                <h1 className="text-xl font-bold">{split.name}</h1>
            </div>

            <GenericListable
                entity="Day"
                data={days}
                getRowId={(day) => day.id.toString()}
                title="Days"
                description="A split day is a collection of series to do on any given
                        day of a workout split. Below you can manage, rearrange,
                        and edit your wokrout split days."
                sheetTitle="Day"
                sheetDescription="Fill out the form below to create or edit a workout split day."
                form={<DayForm />}
                columns={({ editRecord, deleteRecord }) => {
                    return [
                        {
                            header: 'Order',
                            accessorKey: 'order',
                        },
                        {
                            header: 'Name',
                            accessorKey: 'name',
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
                                                editRecord(row.original)
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
                                                deleteRecord(row.original, {
                                                    split_id:
                                                        row.original.split_id,
                                                })
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
                    ];
                }}
            />
        </div>
    </div>
);

export default SplitShowPage;
