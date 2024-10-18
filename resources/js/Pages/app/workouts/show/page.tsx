import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { FC } from 'react';

interface WorkoutShowPageProps {
    workout: Workout;
    split: Split;
    series: Serie[];
}

const WorkoutShowPage: FC<WorkoutShowPageProps> = ({
    workout,
    split,
    series,
}) => {
    return (
        <div>
            <Head
                title={`${format(workout.datetime, 'PP')} ${workout.split?.name} Workout`}
            />

            <h1 className="text-lg font-bold mb-4">
                {format(workout.datetime, 'PP h:mm aa')} - {split.name}
            </h1>

            <div className="grid grid-cols-3 gap-4">
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>Series</CardTitle>
                        <CardDescription>
                            Below you can manage your workout series and sets.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div></div>
                            <div>
                                <Button>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                    New Serie
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WorkoutShowPage;
