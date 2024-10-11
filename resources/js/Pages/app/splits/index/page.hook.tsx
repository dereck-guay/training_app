import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export const SplitsContext = createContext<{
    splits: Split[];
    setSelectedSplit: Dispatch<SetStateAction<Split | null>>;
    setIsSplitFormOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function useSplitsPage() {
    const context = useContext(SplitsContext);

    if (!context) {
        throw Error('SplitsContext must be used inside its provider.');
    }

    const { splits, setSelectedSplit, setIsSplitFormOpen } = context;
    const { toast } = useToast();

    function deleteSplit(split: Split) {
        // Trigger a modal

        router.delete(
            route('splits.destroy', {
                split: split.id,
            }),
            {
                onError: () => {
                    toast({
                        title: 'Error',
                        description:
                            'There was an error when saving this toast.',
                        variant: 'destructive',
                    });
                },
                onFinish: () => {
                    // trigger a toast success.
                    toast({
                        title: 'Success',
                        description: 'The split was removed successfuly',
                        variant: 'success',
                    });
                    router.reload();
                },
            },
        );
    }

    function editSplit(split: Split) {
        setSelectedSplit(split);
        setIsSplitFormOpen(true);
    }

    return {
        splits,
        deleteSplit,
        editSplit,
    };
}
