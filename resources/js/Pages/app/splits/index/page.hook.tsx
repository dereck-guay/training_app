import { createContext, useContext } from 'react';

export const SplitsContext = createContext<Split[] | null>(null);

export function useSplitsContext() {
    const context = useContext(SplitsContext);

    if (!context) {
        throw Error('SplitsContext must be used inside its provider.');
    }

    return context;
}
