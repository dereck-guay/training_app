import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-muted/40">
            {children}
        </div>
    );
};

export default AuthLayout;
