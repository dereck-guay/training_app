import { DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";


interface UseDataTableProps<TData> {
    initialData: TData[],
    getId: (record: TData) => string | number;
    onDragEnd?: (data: TData[]) => void;
}

export default function useDataTable<TData>({
    initialData,
    getId,
    onDragEnd
}: UseDataTableProps<TData>) {
    const [data, setData] = useState(initialData);

    const dataIds = useMemo<UniqueIdentifier[]>(
        () => data?.map((record) => getId(record)),
        [data],
    );


    // reorder rows after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id != over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                const newData = arrayMove(data, oldIndex, newIndex);
                if (onDragEnd) onDragEnd(newData);
                return newData;
            });
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),
    );

    return {
        data,
        dataIds,
        sensors,
        handleDragEnd,
    }
}