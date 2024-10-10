import { cn } from '@/lib/utils';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react';
import { FC } from 'react';

interface LinkProps extends InertiaLinkProps {}

const Link: FC<LinkProps> = ({ className, children, ...rest }) => {
    return (
        <InertiaLink
            className={cn(
                'inline-flex items-center gap-2 hover:text-primary transition-colors',
                className,
            )}
            {...rest}
        >
            <FontAwesomeIcon icon={faUpRightFromSquare} />
            <div className="inline-flex gap-2 items-center">{children}</div>
        </InertiaLink>
    );
};

export default Link;
