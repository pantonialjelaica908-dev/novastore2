import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Product, PageProps } from '@/types';
import EmptyState from '@/Components/EmptyState';
import {
    Boxes,
    Package,
    AlertTriangle,
    PlusCircle,
    ArrowRight,
    TrendingUp,
    Store,
    Calendar,
    ChevronRight,
    Tag,
} from 'lucide-react';

interface DashboardProps extends PageProps {
    stats: {
        totalProducts: number;
        totalStock: number;
        lowStockProducts: number;
    };
    recentProducts: Product[];
}

export default function Dashboard({ stats, recentProducts }: DashboardProps) {
    const { auth } = usePage<PageProps>().props;

    const formatCurrency = (amount: number | string) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(num);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Welcome back, <strong className="text-slate-800">{auth.user?.name}</strong>! Here is an overview of your store inventory.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('products.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-md transition-all active:scale-[0.98]"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Add Product</span>
                        </Link>
                        <Link
                            href={route('products.index')}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                        >
                            <span>Manage Products</span>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard - NovaStore" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
                {/* 3 Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Total Products */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Total Products
                                </p>
                                <h3 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {stats.totalProducts}
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Unique SKU catalog items
                                </p>
                            </div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                                <Boxes className="h-7 w-7" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
                            <Link href={route('products.index')} className="hover:underline flex items-center gap-1">
                                <span>Browse catalog</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                            <span className="text-slate-400">MySQL Persisted</span>
                        </div>
                    </div>

                    {/* Total Units in Stock */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Total Units in Stock
                                </p>
                                <h3 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {stats.totalStock.toLocaleString()}
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Cumulative units available
                                </p>
                            </div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
                                <Package className="h-7 w-7" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-emerald-600">
                            <span className="flex items-center gap-1">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>Live warehouse inventory</span>
                            </span>
                            <span className="text-slate-400">Auto-calculated</span>
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Low Stock Products
                                </p>
                                <h3 className={`mt-2 text-3xl font-extrabold tracking-tight ${
                                    stats.lowStockProducts > 0 ? 'text-amber-600' : 'text-slate-900'
                                }`}>
                                    {stats.lowStockProducts}
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Items with ≤ 5 units remaining
                                </p>
                            </div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-inner">
                                <AlertTriangle className="h-7 w-7" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-amber-600">
                            {stats.lowStockProducts > 0 ? (
                                <Link href={route('products.index')} className="hover:underline flex items-center gap-1">
                                    <span>Requires restocking</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                            ) : (
                                <span className="text-emerald-600">Stock levels healthy</span>
                            )}
                            <span className="text-slate-400">Threshold: 5</span>
                        </div>
                    </div>
                </div>

                {/* Quick Action Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-indigo-500/10 blur-2xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 mb-3">
                                <Store className="h-3.5 w-3.5" />
                                <span>NovaStore Operations</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold">
                                Manage Your Product Catalog with Precision
                            </h2>
                            <p className="mt-1 text-sm text-indigo-100/80">
                                Add new products, update prices and inventory counts in Philippine pesos (₱), or explore the public-facing storefront.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={route('products.create')}
                                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-indigo-900 shadow-sm hover:bg-indigo-50 transition-all active:scale-[0.98]"
                            >
                                + Add New Product
                            </Link>
                            <Link
                                href={route('home')}
                                target="_blank"
                                className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                            >
                                View Live Storefront
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Products Section */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Recently Added Products
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Latest additions to your MySQL inventory catalog
                            </p>
                        </div>

                        <Link
                            href={route('products.index')}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                            <span>View all inventory</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="mt-6">
                        {recentProducts && recentProducts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-400">
                                        <tr>
                                            <th className="py-3 px-4 rounded-l-xl">Product</th>
                                            <th className="py-3 px-4">Price (₱)</th>
                                            <th className="py-3 px-4">Stock</th>
                                            <th className="py-3 px-4">Status</th>
                                            <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {recentProducts.map((product) => {
                                            const isLow = product.stock <= 5;
                                            return (
                                                <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                                                {product.image_url ? (
                                                                    <img
                                                                        src={product.image_url}
                                                                        alt={product.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                                        <Package className="h-5 w-5" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-800 line-clamp-1">
                                                                    {product.name}
                                                                </div>
                                                                <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">
                                                                    {product.description || 'No description'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 font-semibold text-slate-900">
                                                        {formatCurrency(product.price)}
                                                    </td>
                                                    <td className="py-4 px-4 font-medium text-slate-700">
                                                        {product.stock} units
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        {product.stock <= 0 ? (
                                                            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 border border-red-100">
                                                                Out of Stock
                                                            </span>
                                                        ) : isLow ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-100">
                                                                <AlertTriangle className="h-3 w-3" />
                                                                Low Stock ({product.stock})
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                                                                In Stock
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyState
                                title="No Products Created Yet"
                                description="Your inventory is empty. Start by adding your first product to NovaStore."
                                action={
                                    <Link
                                        href={route('products.create')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        <PlusCircle className="h-4 w-4" />
                                        <span>Add First Product</span>
                                    </Link>
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
