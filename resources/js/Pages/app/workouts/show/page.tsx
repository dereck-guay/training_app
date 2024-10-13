import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { FC } from 'react';

interface WorkoutShowPageProps {
    workout: Workout;
}

const WorkoutShowPage: FC<WorkoutShowPageProps> = ({ workout }) => {
    return (
        <div>
            <Head
                title={`${format(workout.datetime, 'PP')} ${workout.split?.name} Workout`}
            />

            <h1 className="text-lg font-bold">
                {format(workout.datetime, 'PP h:mm aa')}
            </h1>
        </div>
    );
};

export default WorkoutShowPage;
