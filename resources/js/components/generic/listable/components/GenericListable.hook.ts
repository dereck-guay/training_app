import { toast } from "@/hooks/use-toast";
import { deleteEntity } from "@/lib/helpers";
import { router, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type ColumnFunctionProps<TData> = {
    editRecord: (record: TData) => void;
    deleteRecord: (record: TData, extraData: Record<string, any>) => void;
}

type GenericListableContextType<TData> = {
    entity?: string;
    data: TData
    columns: (props: ColumnFunctionProps<TData>) => ColumnDef<TData>[],
    setSelectedRecord: Dispatch<SetStateAction<TData | null>>
    setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

export const GenericListableContext = createContext<GenericListableContextType<any> | null>(null)

export function useGenericListable() {
    const { props } = usePage();
    const context = useContext(GenericListableContext);

    if (!context) {
        throw new Error('GenericListableContext must be used within its context provider.');
    }

    const { entity, data, columns, setSelectedRecord, setIsFormOpen } = context;

    function editRecord(record: typeof data[number]) {
        setSelectedRecord(record);
        setIsFormOpen(true);
    }

    function deleteRecord(record: typeof data[number], extraData: Record<string, any>) {
        if (!entity) {
            console.warn('deleteGenericRecord error. No entity provided therefore it did not delete.')
            return;
        }

        deleteEntity(entity, record.id, props.route as string, extraData)
    }

    return {
        entity,
        data,
        columns,
        editRecord,
        deleteRecord,
    }
}