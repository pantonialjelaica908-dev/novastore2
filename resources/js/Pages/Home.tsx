import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Product, PageProps, User } from '@/types';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ProductCard from '@/Components/ProductCard';
import EmptyState from '@/Components/EmptyState';
import Alert from '@/Components/Alert';
import { Search, Sparkles, ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

interface HomeProps extends PageProps<{ auth: { user: User | null } }> {
    products: Product[];
    filters: {
        search?: string;
    };
}

export default function Home({ products, filters, flash }: HomeProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('home'),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(route('home'), {}, { preserveState: true, replace: true });
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
            <Head title="Discover Your Next Favorite Product" />

            {/* Navigation */}
            <Navbar />

            {/* Flash Alerts */}
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

            <main className="flex-1">
                {/* Hero Banner */}
                <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 py-20 sm:py-28 text-white">
                    {/* Background glow effects */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 right-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-indigo-200 backdrop-blur-md border border-white/10 mb-6">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                            <span>Premium Curated Collection</span>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl mx-auto leading-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
                            Discover Your Next Favorite Product.
                        </h1>

                        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-indigo-100/80 leading-relaxed">
                            Welcome to NovaStore, where quality meets innovation. Browse high-grade gadgets, desk essentials, and audio gear backed by real-time inventory and seamless management.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="#catalog"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Explore Products</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Search & Catalog Section */}
                <section id="catalog" className="py-16 sm:py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header with Search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                                <ShoppingBag className="h-4 w-4" />
                                <span>Featured Collection</span>
                            </div>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Explore Store Inventory
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Real-time stock directly synchronized with our local MySQL database.
                            </p>
                        </div>

                        {/* Search bar */}
                        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by product name..."
                                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-20 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute right-14 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                                    >
                                        Clear
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
                                >
                                    Go
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Active search filter indicator */}
                    {filters.search && (
                        <div className="mt-6 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900 border border-indigo-100">
                            <span>
                                Showing results matching: <strong className="font-semibold">"{filters.search}"</strong>
                            </span>
                            <button
                                onClick={handleClearSearch}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                            >
                                Reset search
                            </button>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="mt-10">
                        {products && products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No Products Found"
                                description={
                                    filters.search
                                        ? `No items match "${filters.search}". Try refining your keywords.`
                                        : 'No products are currently available in the database.'
                                }
                                action={
                                    filters.search ? (
                                        <button
                                            onClick={handleClearSearch}
                                            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                                        >
                                            View All Products
                                        </button>
                                    ) : undefined
                                }
                            />
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
