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
    SheetTitle,
} from '@/components/ui/sheet';
import { Head, router } from '@inertiajs/react';
import { FC, useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutsTable from './components/WorkoutsTable';
import WorkoutToolbar from './components/WorkoutToolbar';
import { WorkoutsContext } from './page.hook';

interface WorkoutIndexPageProps {
    workouts: Workout[];
}

const WorkoutIndexPage: FC<WorkoutIndexPageProps> = ({ workouts }) => {
    const [isWorkoutFormOpen, setIsWorkoutFormOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(
        null,
    );

    function setWorkoutFormOpen(setOpen: boolean) {
        if (!setOpen) setSelectedWorkout(null);

        setIsWorkoutFormOpen(setOpen);
    }

    function onFormSave() {
        router.reload();
        setIsWorkoutFormOpen(false);
        setSelectedWorkout(null);
    }

    return (
        <WorkoutsContext.Provider
            value={{
                workouts,
                setSelectedWorkout,
                setIsWorkoutFormOpen,
            }}
        >
            <Head title="Workouts" />

            <Sheet open={isWorkoutFormOpen} onOpenChange={setWorkoutFormOpen}>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Workouts</CardTitle>
                            <CardDescription>
                                Here you can create and manage your workouts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <WorkoutToolbar />
                            <WorkoutsTable />
                        </CardContent>
                    </Card>
                </div>
                <SheetContent className="min-w-[40vw]">
                    <SheetTitle>Workout</SheetTitle>
                    <SheetDescription>
                        Fill out the form below to create or edit a workout.
                    </SheetDescription>
                    <WorkoutForm
                        workout={selectedWorkout}
                        onSave={onFormSave}
                    />
                </SheetContent>
            </Sheet>
        </WorkoutsContext.Provider>
    );
};

export default WorkoutIndexPage;
