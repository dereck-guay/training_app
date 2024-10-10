import { FC } from 'react';

interface SplitShowPageProps {
    split: Split;
}

const SplitShowPage: FC<SplitShowPageProps> = ({ split }) => {
    return <div>{split.name}</div>;
};

export default SplitShowPage;
