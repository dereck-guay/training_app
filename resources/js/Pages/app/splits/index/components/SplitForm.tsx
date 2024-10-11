import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SheetClose } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FC, FormEvent } from 'react';

interface SplitFormProps {
    split: Split | null;
    onSave: () => void;
}

const SplitForm: FC<SplitFormProps> = ({ split, onSave }) => {
    const { data, setData, post, processing, errors, put } = useForm({
        name: split?.name ?? '',
        description: split?.description ?? '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();

        const options = {
            onFinish: () => onSave(),
        };

        if (!!split) {
            put(
                route('splits.update', {
                    split: split.id,
                }),
                options,
            );
            return;
        }

        post(route('splits.store'), options);
    }

    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-full">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Split name"
                    />
                    {errors.name && (
                        <small className="text-destructive">
                            {errors.name}
                        </small>
                    )}
                </div>
                <div className="col-span-full">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Split description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && (
                        <small className="text-destructive">
                            {errors.description}
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

export default SplitForm;
