import DateTimePicker from '@/components/dataware/fields/DateTimePicker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
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
import { Budget } from '@/types/models/budgets';
import { Transaction } from '@/types/models/transactions';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type TransactionFormProps = FC<{
    transaction: Transaction | null;
    budgets: Budget[];
}>;

const TransactionForm: TransactionFormProps = ({ transaction, budgets }) => {
    const { errors } = usePage().props;

    const form = useForm<Transaction>({
        defaultValues: {
            title: transaction?.title,
            amount: transaction?.amount,
            date: transaction?.date,
            budget_id: transaction?.budget_id,
        },
    });

    function onSubmit(data: Transaction) {
        if (transaction) {
            router.put(
                route('transaction.update', {
                    transaction: transaction.id,
                }),
                data,
                {
                    onSuccess: () => router.visit(route('transaction.index')),
                },
            );

            return;
        }

        router.post(route('transaction.store'), data, {
            onSuccess: () => router.visit(route('transaction.index')),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                    <Label>Title</Label>
                    <Input autoFocus placeholder="Transaction title" {...form.register('title')} />
                    {errors.title && <small className="text-destructive">{errors.title}</small>}
                </div>

                <div className="col-span-3">
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        placeholder="Transaction amount"
                        {...form.register('amount')}
                    />
                    {errors.amount && <small className="text-destructive">{errors.amount}</small>}
                </div>

                <FormField
                    control={form.control}
                    name="budget_id"
                    render={({ field }) => (
                        <FormItem className="col-span-full">
                            <FormLabel>Budget</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a budget" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {budgets.map((budget) => (
                                        <SelectItem key={budget.id} value={budget.id.toString()}>
                                            {budget.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.budget_id && (
                                <small className="text-destructive">{errors.amount}</small>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="col-span-3">
                            <FormLabel>Date</FormLabel>
                            <DateTimePicker field={field} hasTime />
                            {errors.date && (
                                <small className="text-destructive">{errors.date}</small>
                            )}
                        </FormItem>
                    )}
                />

                <div className="col-span-full mt-4 flex gap-2">
                    <Button>{transaction ? 'Save' : 'Create'}</Button>
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

export default TransactionForm;
