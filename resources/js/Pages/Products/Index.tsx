import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Product, PaginatedData, PageProps } from '@/types';
import EmptyState from '@/Components/EmptyState';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import {
    PlusCircle,
    Search,
    Edit,
    Trash2,
    Package,
    AlertTriangle,
    CheckCircle2,
    Boxes,
    AlertCircle,
} from 'lucide-react';

interface ProductsIndexProps extends PageProps {
    products: PaginatedData<Product>;
    filters: {
        search?: string;
    };
}

export default function Index({ products, filters }: ProductsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [deleting, setDeleting] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('products.index'),
            { search },
            { preserveState: true, replace: true }
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(route('products.index'), {}, { preserveState: true, replace: true });
    };

    const confirmDelete = (product: Product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!productToDelete) return;
        setDeleting(true);
        router.delete(route('products.destroy', productToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModalOpen(false);
                setProductToDelete(null);
                setDeleting(false);
            },
            onError: () => {
                setDeleting(false);
            },
        });
    };

    const formatCurrency = (val: string | number) => {
        const num = typeof val === 'string' ? parseFloat(val) : val;
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
                            Products Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Create, update, and manage your complete store inventory stored in MySQL.
                        </p>
                    </div>

                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-md transition-all active:scale-[0.98]"
                    >
                        <PlusCircle className="h-4 w-4" />
                        <span>Add New Product</span>
                    </Link>
                </div>
            }
        >
            <Head title="Products Management - NovaStore" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products by name or description..."
                            className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-20 py-2 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="text-xs font-semibold text-slate-500 self-end sm:self-center">
                        Total Catalog: <span className="text-indigo-600 font-bold">{products.total}</span> products
                    </div>
                </div>

                {/* Table card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    {products.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-200">
                                    <tr>
                                        <th className="py-3.5 px-4">Product</th>
                                        <th className="py-3.5 px-4">Description</th>
                                        <th className="py-3.5 px-4">Price (₱)</th>
                                        <th className="py-3.5 px-4">Stock</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {products.data.map((product) => {
                                        const isLow = product.stock > 0 && product.stock <= 5;
                                        const isOut = product.stock <= 0;

                                        return (
                                            <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                                                {/* Product Image & Name */}
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                                                            {product.image_url ? (
                                                                <img
                                                                    src={product.image_url}
                                                                    alt={product.name}
                                                                    className="h-full w-full object-cover"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLElement).style.display = 'none';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                                    <Package className="h-6 w-6 stroke-1" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900 line-clamp-1">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-xs text-slate-400">
                                                                ID: #{product.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Description */}
                                                <td className="py-4 px-4 max-w-xs">
                                                    <p className="line-clamp-2 text-xs text-slate-500 leading-relaxed">
                                                        {product.description || (
                                                            <span className="italic text-slate-400">No description</span>
                                                        )}
                                                    </p>
                                                </td>

                                                {/* Price */}
                                                <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                                                    {formatCurrency(product.price)}
                                                </td>

                                                {/* Stock */}
                                                <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                                                    {product.stock} units
                                                </td>

                                                {/* Status badge */}
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {isOut ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 border border-red-200/60">
                                                            Out of Stock
                                                        </span>
                                                    ) : isLow ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60">
                                                            <AlertTriangle className="h-3 w-3" />
                                                            Low Stock ({product.stock})
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            In Stock
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-4 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                                                            title="Edit Product"
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                            <span>Edit</span>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => confirmDelete(product)}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 shadow-2xs hover:bg-red-50 transition-colors"
                                                            title="Delete Product"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8">
                            <EmptyState
                                title="No Products Available"
                                description={
                                    filters.search
                                        ? `No products match your search keyword "${filters.search}".`
                                        : 'There are currently no products saved in the database.'
                                }
                                action={
                                    filters.search ? (
                                        <button
                                            onClick={handleClearSearch}
                                            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                        >
                                            Clear Filter
                                        </button>
                                    ) : (
                                        <Link
                                            href={route('products.create')}
                                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                        >
                                            <PlusCircle className="h-4 w-4" />
                                            <span>Add Your First Product</span>
                                        </Link>
                                    )
                                }
                            />
                        </div>
                    )}

                    {/* Pagination */}
                    {products.links.length > 3 && (
                        <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-3 flex items-center justify-between sm:px-6">
                            <div className="text-xs text-slate-500">
                                Showing <span className="font-semibold text-slate-700">{products.from || 0}</span> to{' '}
                                <span className="font-semibold text-slate-700">{products.to || 0}</span> of{' '}
                                <span className="font-semibold text-slate-700">{products.total}</span> entries
                            </div>
                            <div className="flex items-center gap-1">
                                {products.links.map((link, index) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={index}
                                                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 opacity-50 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white shadow-xs'
                                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 flex-shrink-0">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Delete Product Confirmation
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Are you sure you want to delete{' '}
                                <strong className="text-slate-800">
                                    "{productToDelete?.name}"
                                </strong>
                                ? This action will remove the record permanently from MySQL.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={() => setDeleteModalOpen(false)}
                            disabled={deleting}
                        >
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={deleting}>
                            {deleting ? 'Deleting...' : 'Yes, Delete Product'}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
