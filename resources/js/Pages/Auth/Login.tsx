import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LogIn, KeyRound, Mail, UserCheck } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in - NovaStore" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Sign in to your NovaStore account to manage products and view inventory.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full pl-10"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="admin@novastore.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <KeyRound className="h-4 w-4 text-slate-400" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full pl-10"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs text-slate-600">
                            Remember me on this device
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full py-3" disabled={processing}>
                        {processing ? (
                            <span>Signing In...</span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <LogIn className="h-4 w-4" />
                                <span>Sign In</span>
                            </span>
                        )}
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
                <p className="text-xs text-slate-500">
                    Don't have an account yet?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                        Create an account
                    </Link>
                </p>
            </div>

            {/* Quick Demo Credentials helper */}
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                    <UserCheck className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Demo Admin Credentials:</span>
                </div>
                <div className="text-slate-500 space-y-0.5">
                    <div>Email: <code className="text-indigo-600 font-mono">admin@novastore.com</code></div>
                    <div>Password: <code className="text-indigo-600 font-mono">password123</code></div>
                </div>
            </div>
        </GuestLayout>
    );
}
