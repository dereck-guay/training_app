import { EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

interface DataCalendarProps<TData> {
    events: TData[];
    transform: (event: TData) => EventInput;
}

const DataCalendar = <TData,>({ events, transform }: DataCalendarProps<TData>) => {
    return (
        <div className="overflow-hidden rounded-md">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                height="auto"
                events={events.map(transform)}
            />
        </div>
    );
};

export default DataCalendar;
