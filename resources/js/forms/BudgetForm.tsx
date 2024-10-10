import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SheetClose } from '@/components/ui/sheet';
import { Budget } from '@/types/models/budgets';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type BudgetFormProps = FC<{
    budget: Budget | null;
}>;

const BudgetForm: BudgetFormProps = ({ budget }) => {
    const { errors } = usePage().props;

    const form = useForm<Budget>({
        defaultValues: {
            title: budget?.title,
            amount: budget?.amount,
        },
    });

    function onSubmit(data: Budget) {
        if (budget) {
            router.put(
                route('budget.update', {
                    budget: budget.id,
                }),
                data,
                {
                    onSuccess: () => router.visit(route('budget.index')),
                },
            );

            return;
        }

        router.post(route('budget.store'), data, {
            onSuccess: () => router.visit(route('budget.index')),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                    <Label>Title</Label>
                    <Input autoFocus placeholder="Budget title" {...form.register('title')} />
                    {errors.title && <small className="text-destructive">{errors.title}</small>}
                </div>

                <div className="col-span-3">
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        placeholder="Transaction date and time"
                        {...form.register('amount')}
                    />
                    {errors.amount && <small className="text-destructive">{errors.amount}</small>}
                </div>

                <div className="col-span-full mt-4 flex gap-2">
                    <Button>{budget ? 'Save' : 'Create'}</Button>
                    <SheetClose asChild>
                        <Button type="button" variant={'ghost'}>
                            No, cancel
                        </Button>
                    </SheetClose>
                </div>
            </form>
        </Form>
    );
};

export default BudgetForm;
