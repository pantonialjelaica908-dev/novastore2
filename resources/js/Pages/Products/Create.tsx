import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import {
    PlusCircle,
    ArrowLeft,
    Image as ImageIcon,
    Tag,
    FileText,
    Boxes,
    HelpCircle,
    Sparkles,
} from 'lucide-react';
import React, { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
    });

    const [imageError, setImageError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={route('products.index')}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Add New Product
                            </h1>
                        </div>
                        <p className="mt-1 text-sm text-slate-500 pl-7">
                            Enter details to create and publish a new item to your store inventory.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Add Product - NovaStore" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                        {/* Section Header */}
                        <div className="border-b border-slate-100 pb-5">
                            <h2 className="text-lg font-bold text-slate-900">
                                Product Information
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Fields marked with <span className="text-red-500 font-semibold">*</span> are required and will be saved to MySQL.
                            </p>
                        </div>

                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Product Name *" />
                            <div className="relative mt-1.5">
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="w-full"
                                    isFocused={true}
                                    placeholder="e.g. Wireless Noise-Cancelling Headphones"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Description (Optional)" />
                            <div className="mt-1.5">
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    placeholder="Provide detailed product specifications, highlights, and features..."
                                    className="w-full rounded-xl border-slate-300 text-slate-900 shadow-sm transition-colors duration-150 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Price & Stock Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price (Philippine Peso ₱) *" />
                                <div className="relative mt-1.5 rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <span className="text-slate-500 font-bold text-sm">₱</span>
                                    </div>
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        name="price"
                                        value={data.price}
                                        className="w-full pl-8"
                                        placeholder="0.00"
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.price} className="mt-2" />
                                <p className="mt-1 text-xs text-slate-400">
                                    Must be numeric and nonnegative (e.g. 1499.00).
                                </p>
                            </div>

                            {/* Stock Quantity */}
                            <div>
                                <InputLabel htmlFor="stock" value="Stock Quantity *" />
                                <div className="relative mt-1.5 rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                        <Boxes className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <TextInput
                                        id="stock"
                                        type="number"
                                        step="1"
                                        min="0"
                                        name="stock"
                                        value={data.stock}
                                        className="w-full pl-10"
                                        placeholder="0"
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.stock} className="mt-2" />
                                <p className="mt-1 text-xs text-slate-400">
                                    Must be a nonnegative integer (≤ 5 flagged as Low Stock).
                                </p>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <InputLabel htmlFor="image_url" value="Product Image URL (Optional)" />
                            <div className="relative mt-1.5">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                    <ImageIcon className="h-4 w-4 text-slate-400" />
                                </div>
                                <TextInput
                                    id="image_url"
                                    type="url"
                                    name="image_url"
                                    value={data.image_url}
                                    className="w-full pl-10"
                                    placeholder="https://images.unsplash.com/photo-..."
                                    onChange={(e) => {
                                        setData('image_url', e.target.value);
                                        setImageError(false);
                                    }}
                                />
                            </div>
                            <InputError message={errors.image_url} className="mt-2" />
                            <p className="mt-1 text-xs text-slate-400">
                                Enter a valid public image URL or leave blank to use the modern default placeholder.
                            </p>

                            {/* Live Image Preview */}
                            {data.image_url && !imageError && (
                                <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-white border border-slate-200 flex-shrink-0">
                                        <img
                                            src={data.image_url}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                            onError={() => setImageError(true)}
                                        />
                                    </div>
                                    <div className="text-xs text-slate-600">
                                        <span className="font-semibold text-emerald-600 block">
                                            ✓ Image preview loaded successfully
                                        </span>
                                        <span className="text-slate-400 line-clamp-1">
                                            {data.image_url}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {imageError && (
                                <p className="mt-2 text-xs text-red-500">
                                    Unable to preview image from the given URL. Please double-check the link.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions bar */}
                    <div className="flex items-center justify-end gap-3">
                        <Link href={route('products.index')}>
                            <SecondaryButton disabled={processing}>Cancel</SecondaryButton>
                        </Link>
                        <PrimaryButton disabled={processing}>
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Saving to Database...</span>
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <PlusCircle className="h-4 w-4" />
                                    <span>Save Product</span>
                                </span>
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
