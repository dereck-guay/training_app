import { Toaster } from '@/components/ui/toaster';
import { faDumbbell, faFolderTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid2X2 } from 'lucide-react';
import { FC } from 'react';
import Navbar from './AppLayout/components/Navbar';
import Sidebar from './AppLayout/components/Sidebar';

type AppLayoutProps = FC<{
    children: React.ReactNode;
}>;

const AppLayout: AppLayoutProps = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar>
                <Sidebar.Link href={route('dashboard')} matcher="/app">
                    <Grid2X2 className="size-5" />
                    Dashboard
                </Sidebar.Link>
                <Sidebar.Link
                    href={route('workouts.index')}
                    matcher="/app/workouts*"
                >
                    <FontAwesomeIcon icon={faDumbbell} className="size-5" />
                    Workouts
                </Sidebar.Link>
                <Sidebar.Link
                    href={route('splits.index')}
                    matcher="/app/splits*"
                >
                    <FontAwesomeIcon icon={faFolderTree} className="size-5" />
                    Splits
                </Sidebar.Link>
            </Sidebar>
            <div className="h-screen grow overflow-y-auto bg-muted/40 p-4">
                <Navbar />
                <main className="pt-4">{children}</main>
                <Toaster />
            </div>
        </div>
    );
};

export default AppLayout;
