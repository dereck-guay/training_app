import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { cloneElement, ReactElement, useState } from 'react';
import {
    ColumnFunctionProps,
    GenericListableContext,
} from './components/GenericListable.hook';
import GenericListableTable from './components/GenericListableTable';
import GenericListableToolbar from './components/GenericListableToolbar';

type GenericListableProps<TData, TFormProps> = {
    entity?: string;
    data: TData[];
    getId: (record: TData) => string;
    columns: (props: ColumnFunctionProps<TData>) => ColumnDef<TData>[];
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    sheetTitle?: string | React.ReactNode;
    sheetDescription?: string | React.ReactNode;
    form?: ReactElement<TFormProps>;
    className?: string;
    onDragEnd?: (data: TData[]) => void;
};

const GenericListable = <TData, TFormProps>({
    entity,
    data,
    getId,
    columns,
    title,
    description,
    sheetTitle,
    sheetDescription,
    form,
    className,
    onDragEnd,
}: GenericListableProps<TData, TFormProps>) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<TData | null>(null);

    function handleOpenChange(setOpen: boolean) {
        if (!setOpen) setSelectedRecord(null);
        setIsFormOpen(setOpen);
    }

    function handleFormSave() {
        router.reload();
        setIsFormOpen(false);
        setSelectedRecord(null);
    }

    // Adds the current selected record as prop to form.
    let formWithProps = null;
    if (form) {
        const oldProps = form.props;
        const newProps = {
            ...oldProps,
            record: selectedRecord,
            onSave: handleFormSave,
        };

        formWithProps = cloneElement(form, newProps);
    }

    return (
        <GenericListableContext.Provider
            value={{
                entity: entity,
                data: data,
                onDragEnd,
                getId,
                columns: columns,
                setIsFormOpen,
                setSelectedRecord,
            }}
        >
            <Sheet open={isFormOpen} onOpenChange={handleOpenChange}>
                <Card className={cn('col-span-full', className)}>
                    <CardHeader>
                        {title && <CardTitle>{title}</CardTitle>}
                        {description && (
                            <CardDescription>{description}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <GenericListableToolbar />
                        <GenericListableTable />
                    </CardContent>
                </Card>
                {formWithProps && (
                    <SheetContent className="min-w-[40vw]">
                        <SheetHeader>
                            {sheetTitle && (
                                <SheetTitle>{sheetTitle}</SheetTitle>
                            )}
                            {sheetDescription && (
                                <SheetDescription>
                                    {sheetDescription}
                                </SheetDescription>
                            )}
                        </SheetHeader>

                        {formWithProps}
                    </SheetContent>
                )}
            </Sheet>
        </GenericListableContext.Provider>
    );
};

export default GenericListable;
