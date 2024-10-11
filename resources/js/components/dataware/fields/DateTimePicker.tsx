import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC, useState } from 'react';

type DateTimePickerProps = {
    value?: string | null; // Accepts the SQL date string.
    onChange?: (date: string | null) => void; // Outputs a SQL date string.
    size?: 'default' | 'sm';
    hasTime?: boolean;
    className?: string;
    placeholder?: string;
};

const DateTimePicker: FC<DateTimePickerProps> = ({
    value,
    onChange,
    size,
    hasTime,
    className,
    placeholder,
}) => {
    const [selectedHour, setSelectedHour] = useState('12');
    const [selectedMinute, setSelectedMinute] = useState('00');

    size ??= 'default';

    const hours = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, '0'),
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, '0'),
    );

    const parseSQLDate = (dateStr: string): Date => {
        return parse(dateStr, 'yyyy-MM-dd HH:mm:ss', new Date());
    };

    const formatSQLDate = (date: Date): string => {
        return format(date, 'yyyy-MM-dd HH:mm:ss');
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const newDate = new Date(date);

            if (hasTime) {
                newDate.setHours(parseInt(selectedHour, 10));
                newDate.setMinutes(parseInt(selectedMinute, 10));
            }

            const formattedDate = formatSQLDate(newDate);
            onChange?.(formattedDate);
        }
    };

    const handleHourChange = (hour: string) => {
        setSelectedHour(hour);
        if (value) {
            const newDate = parseSQLDate(value);
            newDate.setHours(parseInt(hour, 10));
            onChange?.(formatSQLDate(newDate));
        }
    };

    const handleMinuteChange = (minute: string) => {
        setSelectedMinute(minute);
        if (value) {
            const newDate = parseSQLDate(value);
            newDate.setMinutes(parseInt(minute, 10));
            onChange?.(formatSQLDate(newDate));
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size={size}
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !value && 'text-muted-foreground',
                        className,
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? (
                        <span className="text-sm">
                            {hasTime
                                ? format(parseSQLDate(value), 'PPP H:mm aa')
                                : format(parseSQLDate(value), 'PPP')}
                        </span>
                    ) : (
                        <span className="text-sm text-muted-foreground">
                            {placeholder
                                ? placeholder
                                : `Choose a date${hasTime ? ' and time' : ''}...`}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value ? parseSQLDate(value) : undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                />
                {hasTime && (
                    <div className="flex items-center justify-between border-t border-border p-3">
                        <Select
                            value={selectedHour}
                            onValueChange={handleHourChange}
                        >
                            <SelectTrigger className="w-[70px]">
                                <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent>
                                {hours.map((hour) => (
                                    <SelectItem key={hour} value={hour}>
                                        {hour}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">:</span>
                        <Select
                            value={selectedMinute}
                            onValueChange={handleMinuteChange}
                        >
                            <SelectTrigger className="w-[70px]">
                                <SelectValue placeholder="Minute" />
                            </SelectTrigger>
                            <SelectContent>
                                {minutes.map((minute) => (
                                    <SelectItem key={minute} value={minute}>
                                        {minute}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default DateTimePicker;
