import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { PageProps, User } from '@/types';
import { Menu, X, LayoutDashboard, ShoppingBag, PlusCircle, LogIn, UserPlus, LogOut } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage<PageProps<{ auth: { user: User | null } }>>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-8">
                        <Link href={route('home')} className="flex items-center gap-3 group">
                            <ApplicationLogo className="h-9 w-9 transition-transform group-hover:scale-105" />
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 bg-clip-text text-transparent">
                                    NovaStore
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                                    E-Commerce
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:gap-1">
                            <Link
                                href={route('home')}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    route().current('home')
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                Storefront
                            </Link>
                            {auth.user && (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            route().current('dashboard')
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('products.index')}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            route().current('products.*')
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        Inventory
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right side Auth / Actions */}
                    <div className="hidden md:flex md:items-center md:gap-3">
                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('products.create')}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3.5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100 transition-colors"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    <span>Add Product</span>
                                </Link>

                                <div className="h-4 w-px bg-slate-200 mx-1" />

                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-sm">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">
                                        {auth.user.name}
                                    </span>
                                </div>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                                >
                                    <LogIn className="h-4 w-4 text-slate-500" />
                                    <span>Log in</span>
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-md transition-all active:scale-[0.98]"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 md:hidden">
                    <Link
                        href={route('home')}
                        className={`block rounded-lg px-3 py-2 text-base font-medium ${
                            route().current('home')
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-slate-700 hover:bg-slate-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Storefront
                    </Link>

                    {auth.user ? (
                        <>
                            <Link
                                href={route('dashboard')}
                                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                                    route().current('dashboard')
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('products.index')}
                                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                                    route().current('products.*')
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Inventory Management
                            </Link>
                            <Link
                                href={route('products.create')}
                                className="block rounded-lg px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                + Add New Product
                            </Link>

                            <div className="border-t border-slate-100 pt-3 mt-2">
                                <div className="px-3 py-1 text-sm font-semibold text-slate-800">
                                    {auth.user.name} ({auth.user.email})
                                </div>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log out
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="border-t border-slate-100 pt-3 mt-2 space-y-2">
                            <Link
                                href={route('login')}
                                className="block text-center rounded-xl border border-slate-300 py-2 text-sm font-medium text-slate-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="block text-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2 text-sm font-medium text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Create Account
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
