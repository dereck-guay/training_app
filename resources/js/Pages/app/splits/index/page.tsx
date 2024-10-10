import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';
import SplitsTable from './components/SplitsTable';
import { SplitsContext } from './page.hook';

interface SplitIndexPageProps {
    splits: Split[];
}

const SplitIndexPage: FC<SplitIndexPageProps> = ({ splits }) => {
    return (
        <SplitsContext.Provider value={splits}>
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
        </SplitsContext.Provider>
    );
};

export default SplitIndexPage;
