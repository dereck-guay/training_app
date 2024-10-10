import { createContext, useContext } from 'react';

export const WorkoutsContext = createContext<Workout[] | null>(null);

export function useWorkoutsContext() {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error('WorkoutsContext must be used inside its provider.');
    }

    return context;
}
