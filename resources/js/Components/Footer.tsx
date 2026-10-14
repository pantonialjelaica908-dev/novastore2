import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white pt-12 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Feature highlights */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pb-12 border-b border-slate-100">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <Truck className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800">Nationwide Delivery</h4>
                            <p className="text-xs text-slate-500">Fast shipping across the Philippines</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800">Authentic Products</h4>
                            <p className="text-xs text-slate-500">100% verified genuine items</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <RefreshCw className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800">Seamless Management</h4>
                            <p className="text-xs text-slate-500">Real-time MySQL inventory tracking</p>
                        </div>
                    </div>
                </div>

                {/* Main footer row */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-7 w-7" />
                        <span className="text-lg font-bold text-slate-800">NovaStore</span>
                        <span className="text-xs text-slate-400">
                            — Modern E-Commerce Management System
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <Link href={route('home')} className="hover:text-indigo-600 transition-colors">
                            Home
                        </Link>
                        <Link href={route('dashboard')} className="hover:text-indigo-600 transition-colors">
                            Dashboard
                        </Link>
                        <Link href={route('products.index')} className="hover:text-indigo-600 transition-colors">
                            Inventory
                        </Link>
                    </div>

                    <div className="text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} NovaStore. Powered by Laravel & React.
                    </div>
                </div>
            </div>
        </footer>
    );
}
