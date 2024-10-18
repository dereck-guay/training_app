import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetTrigger } from '@/components/ui/sheet';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router } from '@inertiajs/react';
import { FormEvent } from 'react';
import { useGenericListable } from './GenericListable.hook';

interface GenericListableToolbar {
    isSearchable?: boolean;
}

const GenericListableToolbar = ({ isSearchable = false }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const { entity } = useGenericListable();

    function handleSearchChange(e: FormEvent<HTMLInputElement>) {
        router.reload({
            data: {
                keywords: e.currentTarget.value,
            },
        });
    }

    return (
        <div className="mb-4 flex items-center justify-between">
            <div>
                {isSearchable && (
                    <Input
                        placeholder="Search keywords..."
                        defaultValue={queryParams.get('keywords') ?? ''}
                        onChange={handleSearchChange}
                    />
                )}
            </div>
            <div>
                {entity && (
                    <SheetTrigger asChild>
                        <Button>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New {entity}
                        </Button>
                    </SheetTrigger>
                )}
            </div>
        </div>
    );
};

export default GenericListableToolbar;
