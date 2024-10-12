import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type SidebarProps = FC<{
    children: React.ReactNode;
}> & {
    Link: SidebarLinkProps;
};

const Sidebar: SidebarProps = ({ children }) => {
    return (
        <aside className="h-screen w-60 min-w-60 border-r p-4">
            <div className="mb-4 flex h-10 items-center">
                <h1 className="flex items-center gap-2 text-xl font-bold">
                    <FontAwesomeIcon
                        icon={faDumbbell}
                        className="size-8 text-primary"
                    />
                    Training Tracker
                </h1>
            </div>
            <div className="flex flex-col gap-2">{children}</div>
        </aside>
    );
};

type SidebarLinkProps = FC<{
    children: React.ReactNode;
    href: string;
    matcher: string;
}>;

const SidebarLink: SidebarLinkProps = ({ children, href, matcher }) => {
    const { pathname } = window.location;

    const isActive = pathname.match(
        new RegExp(`^${matcher}$`.replace('*$', '($|/)')),
    );

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 rounded px-4 py-1 font-medium transition-all ${isActive ? 'bg-primary text-primary-foreground shadow hover:scale-105' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
        >
            {children}
        </Link>
    );
};

Sidebar.Link = SidebarLink;
export default Sidebar;
