import DateTimePicker from '@/components/dataware/fields/DateTimePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SheetClose } from '@/components/ui/sheet';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { FC, FormEvent, useEffect, useState } from 'react';

interface WorkoutFormProps {
    workout: Workout | null;
    onSave: () => void;
}

const WorkoutForm: FC<WorkoutFormProps> = ({ workout, onSave }) => {
    const { data, setData, post, processing, errors, put } = useForm({
        datetime: workout?.datetime ?? '',
        split_id: workout?.split_id ?? '',
        calories: workout?.calories ?? '',
        time: workout?.calories ?? '',
    });

    const [splits, setSplits] = useState<Split[] | null>();
    useEffect(() => {
        async function getSplits() {
            const { data } = await axios.get(
                route('generic.list', {
                    entity: 'Split',
                }),
            );

            setSplits(data.data);
        }
        getSplits();
    }, []);

    function submit(e: FormEvent) {
        e.preventDefault();

        const options = {
            onFinish: () => onSave(),
        };

        if (!!workout) {
            put(
                route('workouts.update', {
                    workout: workout.id,
                }),
                options,
            );
            return;
        }

        post(route('workouts.store'), options);
    }

    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-full">
                    <Label htmlFor="datetime">Date</Label>
                    <DateTimePicker />
                    {errors.datetime && (
                        <small className="text-destructive">
                            {errors.datetime}
                        </small>
                    )}
                </div>
                <div className="col-span-full">
                    <Label htmlFor="split_id">Split</Label>
                    <Select
                        name="split_id"
                        value={data.split_id.toString()}
                        onValueChange={(value) => setData('split_id', value)}
                    >
                        <SelectTrigger id="split_id">
                            <SelectValue placeholder="Split" />
                        </SelectTrigger>
                        <SelectContent>
                            {!!splits &&
                                splits.map((s) => (
                                    <SelectItem
                                        key={s.id}
                                        value={s.id.toString()}
                                    >
                                        {s.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-6">
                    <Label htmlFor="calories">Name</Label>
                    <Input
                        type="number"
                        id="calories"
                        name="calories"
                        value={data.calories}
                        onChange={(e) => setData('calories', e.target.value)}
                        placeholder="Calories spent"
                    />
                    {errors.calories && (
                        <small className="text-destructive">
                            {errors.calories}
                        </small>
                    )}
                </div>
                <div className="col-span-6">
                    <Label htmlFor="time">Time (mins)</Label>
                    <Input
                        type="number"
                        id="time"
                        name="time"
                        value={data.time}
                        onChange={(e) => setData('time', e.target.value)}
                        placeholder="Time spent"
                    />
                    {errors.time && (
                        <small className="text-destructive">
                            {errors.time}
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

export default WorkoutForm;
