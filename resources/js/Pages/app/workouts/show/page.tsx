import { format } from 'date-fns';
import { FC } from 'react';

interface WorkoutShowPageProps {
    workout: Workout;
}

const WorkoutShowPage: FC<WorkoutShowPageProps> = ({ workout }) => {
    return <div>{format(workout.datetime, 'PPpp')}</div>;
};

export default WorkoutShowPage;
