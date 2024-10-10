import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { FC, FormEventHandler } from 'react';

type LoginPageProps = FC<{
    status?: string;
    canResetPassword: boolean;
}>;

const LoginPage: LoginPageProps = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Training App</CardTitle>
            </CardHeader>
            <CardContent>
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            autoFocus
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        ></Input>

                        {errors.email && (
                            <small className="text-destructive">
                                {errors.email}
                            </small>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            autoFocus
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="username"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        ></Input>

                        {errors.password && (
                            <small className="text-destructive">
                                {errors.password}
                            </small>
                        )}
                    </div>

                    <div className="mt-4 block">
                        <Label htmlFor="remember" className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(check) =>
                                    setData('remember', Boolean(check))
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </Label>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <Link href={route('register')}>
                            <Button variant={'secondary'}>Register</Button>
                        </Link>

                        <div className="flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <Button
                                type="submit"
                                className="ms-4"
                                disabled={processing}
                            >
                                Log in
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginPage;
