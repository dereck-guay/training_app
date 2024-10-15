import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SheetClose } from '@/components/ui/sheet';
import { useForm, usePage } from '@inertiajs/react';
import { FC, FormEvent } from 'react';

interface DayFormProps {
    record?: Day | null;
    onSave?: () => void;
}

const DayForm: FC<DayFormProps> = ({ record, onSave }) => {
    const split = usePage().props.split as Split;

    const { data, setData, post, processing, errors, put } = useForm({
        split_id: split.id,
        name: record?.name ?? '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                if (onSave) {
                    onSave();
                    return;
                }

                console.warn(
                    'onSave was not provided to DayForm therefore it did not save.',
                );
            },
        };

        console.log(record);
        if (!!record) {
            put(
                route('days.update', {
                    day: record.id,
                }),
                options,
            );
            return;
        }

        post(route('days.store'), options);
    }

    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-full">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name?.toString()}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Name"
                    />
                    {errors.name && (
                        <small className="text-destructive">
                            {errors.name}
                        </small>
                    )}
                </div>
                <div className="col-span-full flex gap-2 items-center">
                    <Button type="submit" disabled={processing}>
                        Save
                    </Button>
                    <SheetClose asChild>
                        <Button variant={'ghost'}>No, cancel</Button>
                    </SheetClose>
                </div>
            </div>
        </form>
    );
};

export default DayForm;
