<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed default store admin user if it doesn't already exist
        User::firstOrCreate(
            ['email' => 'admin@novastore.com'],
            [
                'name' => 'NovaStore Admin',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        $initialProducts = [
            [
                'name' => 'Nova Pro Wireless Headphones',
                'description' => 'High-fidelity active noise-cancelling wireless headphones with 40-hour battery life, plush memory foam earcups, and spatial audio.',
                'price' => 7499.00,
                'stock' => 18,
                'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            ],
            [
                'name' => 'Aura RGB Mechanical Keyboard',
                'description' => 'Hot-swappable RGB mechanical gaming keyboard featuring custom factory-lubed linear switches and CNC anodized aluminum chassis.',
                'price' => 4250.00,
                'stock' => 12,
                'image_url' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
            ],
            [
                'name' => 'Vortex 34" Curved Ultrawide Monitor',
                'description' => 'WQHD 144Hz 1ms curved gaming & productivity monitor with 99% sRGB color gamut, HDR400, and integrated USB-C dock.',
                'price' => 21990.00,
                'stock' => 4, // Low stock <= 5
                'image_url' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
            ],
            [
                'name' => 'Apex Ergonomic Wireless Mouse',
                'description' => 'Ultra-lightweight ergonomic wireless mouse with 26K DPI optical sensor, optical switches, and magnetic charging dock.',
                'price' => 2890.00,
                'stock' => 25,
                'image_url' => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
            ],
            [
                'name' => 'Echo Smart Fitness Watch',
                'description' => 'Modern fitness smartwatch with vibrant AMOLED display, 24/7 heart-rate and SpO2 monitoring, and 14-day battery life.',
                'price' => 5490.00,
                'stock' => 3, // Low stock <= 5
                'image_url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
            ],
            [
                'name' => 'Lumina Minimalist Desk Lamp',
                'description' => 'Architectural LED desk lamp with touch stepless dimming, auto-ambient sensor, dual color temperatures, and wireless charging pad.',
                'price' => 1850.00,
                'stock' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
            ],
            [
                'name' => 'Pulse 360 Waterproof Bluetooth Speaker',
                'description' => 'Compact IPX7 waterproof Bluetooth speaker delivering 360-degree room-filling acoustic sound and punchy bass radiators.',
                'price' => 3290.00,
                'stock' => 9,
                'image_url' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
            ],
            [
                'name' => 'Nexus 100W GaN Fast Charger',
                'description' => 'Ultra-compact 4-port Gallium Nitride (GaN) fast desktop wall charger for laptops, tablets, and mobile devices.',
                'price' => 1750.00,
                'stock' => 2, // Low stock <= 5
                'image_url' => 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
            ],
        ];

        foreach ($initialProducts as $productData) {
            Product::firstOrCreate(
                ['name' => $productData['name']],
                $productData
            );
        }
    }
}
