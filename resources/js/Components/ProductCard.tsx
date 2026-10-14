import { Product } from '@/types';
import { Package, AlertTriangle, CheckCircle, Tag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const priceNumber = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    const formattedPrice = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    }).format(priceNumber);

    const isOutOfStock = product.stock <= 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
            {/* Image container */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            // Fallback on image load error
                            (e.target as HTMLElement).style.display = 'none';
                            const fallback = document.getElementById(`fallback-${product.id}`);
                            if (fallback) fallback.style.display = 'flex';
                        }}
                    />
                ) : null}

                {/* Fallback Placeholder */}
                <div
                    id={`fallback-${product.id}`}
                    className={`h-full w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100 text-indigo-400 ${
                        product.image_url ? 'hidden' : 'flex'
                    }`}
                >
                    <Package className="h-16 w-16 stroke-1 text-indigo-300 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Stock Badge */}
                <div className="absolute top-3 right-3">
                    {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                            Out of Stock
                        </span>
                    ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                            <AlertTriangle className="h-3 w-3" />
                            Only {product.stock} left
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                            <CheckCircle className="h-3 w-3" />
                            {product.stock} in stock
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex-1">
                    <h3 className="line-clamp-1 text-base font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                        {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500 leading-relaxed">
                        {product.description || 'No description provided.'}
                    </p>
                </div>

                {/* Price and Stock Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Price
                        </span>
                        <div className="text-lg font-bold text-slate-900 tracking-tight">
                            {formattedPrice}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg bg-indigo-50/80 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        <Tag className="h-3.5 w-3.5" />
                        <span>Qty: {product.stock}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
