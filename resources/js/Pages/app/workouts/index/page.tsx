import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import WorkoutsTable from './components/WorkoutsTable';
import { WorkoutsContext } from './page.hook';

interface WorkoutIndexPageProps {
    workouts: Workout[];
}

const WorkoutIndexPage: FC<WorkoutIndexPageProps> = ({ workouts }) => {
    return (
        <WorkoutsContext.Provider value={workouts}>
            <Head title="Workouts" />
            <Card>
                <CardHeader>
                    <CardTitle>Workouts</CardTitle>
                    <CardDescription>
                        Here you can create and manage your workouts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <WorkoutsTable />
                </CardContent>
            </Card>
        </WorkoutsContext.Provider>
    );
};

export default WorkoutIndexPage;
