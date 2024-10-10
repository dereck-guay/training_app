import { format } from 'date-fns';
import { Ban, Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DateRangePickerSize = 'default' | 'sm' | 'lg';

interface DateRangePickerProps {
    className?: string;
    onRangeChange?: (range: DateRange | undefined) => void;
    defaultValue?: DateRange;
    form?: UseFormReturn<any>;
    size?: DateRangePickerSize;
}

export default function DateRangePicker({
    className,
    onRangeChange,
    defaultValue,
    form,
    size = 'default',
}: DateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(defaultValue);

    const handleDateChange = (newDate: DateRange | undefined) => {
        setDate(newDate);
        if (onRangeChange) {
            onRangeChange(newDate);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDate(undefined);
        if (onRangeChange) {
            onRangeChange(undefined);
        }
        if (form) {
            form.setValue('dateRange', undefined);
        }
    };

    const { control } = form || useForm();

    const sizeClasses = {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
    };

    const iconSizes = {
        default: 'h-4 w-4',
        sm: 'h-3 w-3',
        lg: 'h-5 w-5',
    };

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative inline-block">
                        <Button
                            id="date"
                            variant={'outline'}
                            className={cn(
                                'w-[300px] justify-start text-left font-normal',
                                !date && 'text-muted-foreground',
                                sizeClasses[size],
                            )}
                        >
                            <CalendarIcon className={cn('mr-2', iconSizes[size])} />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, 'LLL dd, y')} -{' '}
                                        {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                        {date && (
                            <Button
                                variant="ghost"
                                size={size}
                                className="absolute right-0 top-0 h-full rounded-l-none border-y border-r px-3 py-2 hover:rounded-r"
                                onClick={handleClear}
                            >
                                <Ban className={iconSizes[size]} />
                            </Button>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Controller
                        name="dateRange"
                        control={control}
                        defaultValue={defaultValue}
                        render={({ field }) => (
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from || new Date()}
                                selected={date}
                                onSelect={(newDate) => {
                                    handleDateChange(newDate);
                                    field.onChange(newDate);
                                }}
                                numberOfMonths={2}
                            />
                        )}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
