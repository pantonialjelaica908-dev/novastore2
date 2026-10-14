export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string | number;
    stock: number;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface FlashMessages {
    success?: string | null;
    error?: string | null;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: FlashMessages;
};
