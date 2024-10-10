import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { FC, useEffect } from 'react';
import WorkoutsTable from './components/WorkoutsTable';
import { WorkoutsContext } from './page.hook';

interface WorkoutIndexPageProps {
    workouts: Workout[];
}

const WorkoutIndexPage: FC<WorkoutIndexPageProps> = ({ workouts }) => {
    useEffect(() => {
        async function getData() {
            const res = await fetch(
                route('generic.list', {
                    entity: 'Exercise',
                }),
            );

            const data = await res.json();
            console.log(data);
        }

        getData();
    }, []);

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
