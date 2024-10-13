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
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Head, router } from '@inertiajs/react';
import { FC, useState } from 'react';
import SplitForm from './components/SplitForm';
import SplitsTable from './components/SplitsTable';
import SplitsToolbar from './components/SplitsToolbar';
import { SplitsContext } from './page.hook';

interface SplitIndexPageProps {
    splits: Split[];
}

const SplitIndexPage: FC<SplitIndexPageProps> = ({ splits }) => {
    const [isSplitFormOpen, setIsSplitFormOpen] = useState(false);
    const [selectedSplit, setSelectedSplit] = useState<Split | null>(null);

    function setSplitFormOpen(setOpen: boolean) {
        if (!setOpen) setSelectedSplit(null);
        setIsSplitFormOpen(setOpen);
    }

    function onFormSave() {
        router.reload();
        setIsSplitFormOpen(false);
        setSelectedSplit(null);
    }

    return (
        <SplitsContext.Provider
            value={{
                splits,
                setIsSplitFormOpen,
                setSelectedSplit,
            }}
        >
            <Head title="Splits" />
            <Sheet open={isSplitFormOpen} onOpenChange={setSplitFormOpen}>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Splits</CardTitle>
                            <CardDescription>
                                Here you can manage all your current workout
                                splits.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SplitsToolbar />
                            <SplitsTable />
                        </CardContent>
                    </Card>
                </div>
                <SheetContent className="min-w-[40vw]">
                    <SheetHeader>
                        <SheetTitle>Workout Split</SheetTitle>
                        <SheetDescription>
                            Fill out the form below to create or edit a workout
                            split.
                        </SheetDescription>
                    </SheetHeader>

                    <SplitForm onSave={onFormSave} split={selectedSplit} />
                </SheetContent>
            </Sheet>
        </SplitsContext.Provider>
    );
};

export default SplitIndexPage;
