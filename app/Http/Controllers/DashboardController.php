<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with real inventory statistics.
     */
    public function index(): Response
    {
        $totalProducts = Product::count();
        $totalStock = (int) Product::sum('stock');
        $lowStockProducts = Product::where('stock', '<=', 5)->count();
        $recentProducts = Product::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalStock' => $totalStock,
                'lowStockProducts' => $lowStockProducts,
            ],
            'recentProducts' => $recentProducts,
        ]);
    }
}
