import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const RegisterPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>

            <Head title="Register" />

            <CardContent>
                <form onSubmit={submit} className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            autoFocus
                            id="name"
                            type="name"
                            name="name"
                            value={data.name}
                            autoComplete="username"
                            onChange={(e) => setData('name', e.target.value)}
                        ></Input>

                        {errors.name && (
                            <small className="text-destructive">
                                {errors.name}
                            </small>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            autoFocus
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="useremail"
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
                            autoComplete="new-password"
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

                    <div>
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>
                        <Input
                            autoFocus
                            id="password_confirmation"
                            type="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        ></Input>

                        {errors.password_confirmation && (
                            <small className="text-destructive">
                                {errors.password_confirmation}
                            </small>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>

                        <Button
                            type="submit"
                            className="ms-4"
                            disabled={processing}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default RegisterPage;
