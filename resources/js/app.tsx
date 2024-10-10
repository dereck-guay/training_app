import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import AuthLayout from './pages/layout/AuthLayout';
import AppLayout from './pages/layout/AppLayout';
import GuestLayout from './pages/layout/GuestLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        const page = await resolvePageComponent(`./pages/${name}.tsx`, pages);

        if (name.startsWith('app')) {
            /** @ts-ignore */
            page.default.layout = (page) => (
                /** @ts-ignore */
                <AppLayout children={page} auth={page.props.auth} />
            );
        } else if (name.startsWith('auth')) {
            /** @ts-ignore */
            page.default.layout = (page) => <AuthLayout children={page} />;
        } else {
            /** @ts-ignore */
            page.default.layout = (page) => <GuestLayout children={page} />;
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#000000',
    },
});
