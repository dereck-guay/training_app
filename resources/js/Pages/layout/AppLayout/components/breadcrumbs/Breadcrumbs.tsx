import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const Breadcrumbs = () => {
    const pathSegments = window.location.pathname.split('/').slice(1);
    let urlBuilder = '';

    return (
        <div className="flex items-center text-sm">
            {pathSegments.map((s, i) => {
                if (i === 0) s = 'app';

                urlBuilder += `/${s}`;

                if (s === 'app') s = 'dashboard';
                s = s
                    .split('_')
                    .map(
                        (segment) =>
                            segment.charAt(0).toUpperCase() + segment.slice(1),
                    )
                    .join(' ');

                return (
                    <Fragment key={s}>
                        {i !== 0 && (
                            <ArrowRight className="mx-1 size-4 text-muted-foreground" />
                        )}
                        <Link
                            href={urlBuilder}
                            className={`hover:underline ${i === pathSegments.length - 1 ? 'text-primary' : ''}`}
                        >
                            {s}
                        </Link>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
