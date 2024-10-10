import { Head } from '@inertiajs/react';
import { FC } from 'react';

interface SplitShowPageProps {
    split: Split;
}

const SplitShowPage: FC<SplitShowPageProps> = ({ split }) => {
    return (
        <div>
            <Head title={split.name} />

            <div>{split.name}</div>
        </div>
    );
};

export default SplitShowPage;
