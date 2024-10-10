import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router } from '@inertiajs/react';
import { FormEvent } from 'react';

const SplitsToolbar = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const initialKeywords = queryParams.get('keywords') ?? '';

    function handleSearchChange(e: FormEvent<HTMLInputElement>) {
        const newValue = e.currentTarget.value;
        router.reload({
            data: {
                keywords: newValue,
            },
        });
    }

    return (
        <div className="flex items-center justify-between">
            <div>
                <Input
                    className="bg-background"
                    placeholder="Search splits"
                    defaultValue={initialKeywords}
                    onChange={handleSearchChange}
                />
            </div>
            <div>
                <Button>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    New Split
                </Button>
            </div>
        </div>
    );
};

export default SplitsToolbar;
