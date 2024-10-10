import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import SplitsTable from './components/SplitsTable';
import SplitsToolbar from './components/SplitsToolbar';
import { SplitsContext } from './page.hook';

interface SplitIndexPageProps {
    splits: Split[];
}

const SplitIndexPage: FC<SplitIndexPageProps> = ({ splits }) => {
    return (
        <SplitsContext.Provider value={splits}>
            <Head title="Splits" />
            <div className="flex flex-col gap-4">
                <SplitsToolbar />

                <Card>
                    <CardHeader>
                        <CardTitle>Splits</CardTitle>
                        <CardDescription>
                            Here you can manage all your current workout splits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SplitsTable />
                    </CardContent>
                </Card>
            </div>
        </SplitsContext.Provider>
    );
};

export default SplitIndexPage;
