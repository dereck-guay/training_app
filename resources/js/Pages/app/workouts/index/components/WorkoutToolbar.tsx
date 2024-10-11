import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetTrigger } from '@/components/ui/sheet';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router } from '@inertiajs/react';
import { FormEvent } from 'react';

const WorkoutToolbar = () => {
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
                    placeholder="Search keywords"
                    className="bg-background"
                    defaultValue={initialKeywords}
                    onChange={handleSearchChange}
                />
            </div>

            <div>
                <SheetTrigger asChild>
                    <Button>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        New Workout
                    </Button>
                </SheetTrigger>
            </div>
        </div>
    );
};

export default WorkoutToolbar;
