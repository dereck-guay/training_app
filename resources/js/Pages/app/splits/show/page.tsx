import { Head } from '@inertiajs/react';
import { FC } from 'react';

interface SplitShowPageProps {
    split: Split;
}

const SplitShowPage: FC<SplitShowPageProps> = ({ split }) => {
    return (
        <div>
            <Head title={split.name} />

            <div>
                <h1 className="text-xl font-bold">{split.name}</h1>
            </div>
        </div>
    );
};

export default SplitShowPage;
