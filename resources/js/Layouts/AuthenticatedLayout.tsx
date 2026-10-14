import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Alert from '@/Components/Alert';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { PlusCircle, ExternalLink, ChevronDown } from 'lucide-react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash } = usePage<PageProps>().props;
    const user = auth.user!;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white flex flex-col">
            <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-3 group">
                                    <ApplicationLogo className="block h-9 w-9 transition-transform group-hover:scale-105" />
                                    <div className="flex flex-col">
                                        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                            NovaStore
                                        </span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                                            Admin Portal
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Nav Links */}
                            <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex sm:items-center">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('products.index')}
                                    active={route().current('products.*')}
                                >
                                    Manage Products
                                </NavLink>
                                <a
                                    href={route('home')}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <span>Storefront</span>
                                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                                </a>
                            </div>
                        </div>

                        {/* Right side user dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center sm:gap-3">
                            <Link
                                href={route('products.create')}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 transition-all active:scale-[0.98]"
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span>Add Product</span>
                            </Link>

                            <div className="relative ms-2">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-xl">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            >
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{user.name}</span>
                                                <ChevronDown className="h-4 w-4 text-slate-400" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1'
                    }
                >
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route('products.index')}
                        active={route().current('products.*')}
                    >
                        Manage Products
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('home')}>
                        View Storefront
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('products.create')}>
                        + Add New Product
                    </ResponsiveNavLink>

                    <div className="border-t border-slate-100 pt-3 mt-2">
                        <div className="px-3 py-1">
                            <div className="text-sm font-semibold text-slate-800">
                                {user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-2 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mt-4">
                    <Alert type="success" message={flash.success} />
                </div>
            )}
            {flash?.error && (
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 mt-4">
                    <Alert type="error" message={flash.error} />
                </div>
            )}

            {header && (
                <header className="bg-white border-b border-slate-200/80 shadow-xs">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-1 pb-16">{children}</main>
        </div>
    );
}
