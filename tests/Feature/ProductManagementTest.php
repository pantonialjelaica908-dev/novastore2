<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_renders_successfully_for_guests(): void
    {
        Product::create([
            'name' => 'Nova Wireless Earbuds',
            'description' => 'Compact Bluetooth earbuds with deep bass.',
            'price' => 2499.00,
            'stock' => 15,
            'image_url' => 'https://example.com/earbuds.jpg',
        ]);

        $response = $this->get(route('home'));

        $response->assertStatus(200);
        $response->assertSee('Nova Wireless Earbuds');
    }

    public function test_guests_cannot_access_dashboard_and_are_redirected_to_login(): void
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_access_dashboard_with_inventory_stats(): void
    {
        $user = User::factory()->create();

        Product::create([
            'name' => 'High Stock Item',
            'description' => 'Plenty in stock',
            'price' => 500.00,
            'stock' => 20,
        ]);

        Product::create([
            'name' => 'Low Stock Item',
            'description' => 'Almost gone',
            'price' => 1200.00,
            'stock' => 3, // <= 5 is low stock
        ]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_view_product_list(): void
    {
        $user = User::factory()->create();

        $product = Product::create([
            'name' => 'Mechanical Keyboard',
            'description' => 'Clicky switches',
            'price' => 3500.00,
            'stock' => 10,
        ]);

        $response = $this->actingAs($user)->get(route('products.index'));

        $response->assertStatus(200);
        $response->assertSee('Mechanical Keyboard');
    }

    public function test_authenticated_user_can_create_a_product_with_valid_data(): void
    {
        $user = User::factory()->create();

        $payload = [
            'name' => 'Studio Microphone',
            'description' => 'Cardioid USB condenser mic.',
            'price' => 4599.50,
            'stock' => 8,
            'image_url' => 'https://example.com/mic.jpg',
        ];

        $response = $this->actingAs($user)->post(route('products.store'), $payload);

        $response->assertRedirect(route('products.index'));
        $response->assertSessionHas('success', 'Product created successfully.');

        $this->assertDatabaseHas('products', [
            'name' => 'Studio Microphone',
            'stock' => 8,
        ]);
    }

    public function test_product_creation_requires_valid_data(): void
    {
        $user = User::factory()->create();

        // Empty name, negative price, negative stock, invalid URL
        $invalidPayload = [
            'name' => '',
            'price' => -100,
            'stock' => -5,
            'image_url' => 'not-a-valid-url',
        ];

        $response = $this->actingAs($user)->post(route('products.store'), $invalidPayload);

        $response->assertSessionHasErrors(['name', 'price', 'stock', 'image_url']);
        $this->assertDatabaseCount('products', 0);
    }

    public function test_authenticated_user_can_update_a_product(): void
    {
        $user = User::factory()->create();

        $product = Product::create([
            'name' => 'Original Item Name',
            'description' => 'Original description',
            'price' => 1000.00,
            'stock' => 5,
        ]);

        $updatePayload = [
            'name' => 'Updated Item Name',
            'description' => 'Updated description',
            'price' => 1250.00,
            'stock' => 12,
            'image_url' => 'https://example.com/updated.jpg',
        ];

        $response = $this->actingAs($user)->put(route('products.update', $product->id), $updatePayload);

        $response->assertRedirect(route('products.index'));
        $response->assertSessionHas('success', 'Product updated successfully.');

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Item Name',
            'price' => 1250.00,
            'stock' => 12,
        ]);
    }

    public function test_authenticated_user_can_delete_a_product(): void
    {
        $user = User::factory()->create();

        $product = Product::create([
            'name' => 'Item To Be Removed',
            'price' => 999.00,
            'stock' => 1,
        ]);

        $response = $this->actingAs($user)->delete(route('products.destroy', $product->id));

        $response->assertRedirect(route('products.index'));
        $response->assertSessionHas('success', 'Product deleted successfully.');

        $this->assertDatabaseMissing('products', [
            'id' => $product->id,
        ]);
    }
}
