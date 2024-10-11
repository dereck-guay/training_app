import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export const WorkoutsContext = createContext<{
    workouts: Workout[] | null;
    setSelectedWorkout: Dispatch<SetStateAction<Workout | null>>;
    setIsWorkoutFormOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function useWorkoutsContext() {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error('WorkoutsContext must be used inside its provider.');
    }

    const { workouts, setSelectedWorkout, setIsWorkoutFormOpen } = context;
    const { toast } = useToast();

    function deleteWorkout(workout: Workout) {
        // Trigger a modal

        router.delete(
            route('workouts.destroy', {
                workout: workout.id,
            }),
            {
                onError: () => {
                    toast({
                        title: 'Error',
                        description:
                            'There was an error when saving this workout.',
                        variant: 'destructive',
                    });
                },
                onFinish: () => {
                    // trigger a toast success.
                    toast({
                        title: 'Success',
                        description: 'The workout was removed successfuly',
                        variant: 'success',
                    });
                    router.reload();
                },
            },
        );
    }

    function editWorkout(workout: Workout) {
        setSelectedWorkout(workout);
        setIsWorkoutFormOpen(true);
    }

    return {
        workouts,
        deleteWorkout,
        editWorkout,
    };
}
