# NovaStore — E-Commerce Management System

**NovaStore** is a modern, responsive e-commerce storefront and inventory management system built with **Laravel**, **React with TypeScript**, **Tailwind CSS**, **Inertia.js**, and a local **XAMPP MySQL/MariaDB** database.

---

## 🚀 Key Features

- **Public Storefront (`/`)**:
  - Hero banner: *"Discover Your Next Favorite Product."*
  - Live product catalog pulled directly from MySQL.
  - Search by product name and description.
  - Formatted prices in **Philippine Pesos (₱)**.
  - Dynamic stock badges (*In Stock*, *Low Stock*, *Out of Stock*).
  - Modern empty states, responsive product grid, and footer.
- **Complete Laravel Authentication (`/login`, `/register`, `/logout`)**:
  - Secure session handling, CSRF protection, and server-side validation.
  - Password hashing with Bcrypt.
  - Database-backed user accounts stored in MySQL `users` table.
- **Admin Dashboard (`/dashboard`)**:
  - Protected with Laravel authentication middleware.
  - 3 real-time Eloquent statistic cards:
    - **Total Products**
    - **Total Units in Stock**
    - **Low Stock Products** (≤ 5 units remaining)
  - Recent products inventory table.
  - Quick action shortcuts to Add Product and Manage Inventory.
- **Full Products CRUD Management (`/products`)**:
  - Resource routes: Index, Create, Store, Edit, Update, Destroy.
  - Server-side validation (Required name, numeric nonnegative price, integer nonnegative stock, valid image URL).
  - Image preview with fallbacks.
  - Delete product confirmation modal.
  - Toast/Alert flash notifications on create, update, and delete.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Backend** | Laravel 12 (PHP 8.3+) |
| **Frontend** | React 18 with TypeScript |
| **Routing / Bridge** | Inertia.js (Inertia React 2.0) |
| **Styling** | Tailwind CSS (Indigo & Violet Palette) |
| **Icons** | Lucide React |
| **Local Database** | XAMPP MySQL / MariaDB (Port 3306) |
| **Build Tool** | Vite |

---

## 📋 Required Software

1. **XAMPP** (with Apache and MySQL / MariaDB services)
2. **PHP 8.3+** with `pdo_mysql` and `openssl` extensions enabled
3. **Composer** (v2.x)
4. **Node.js** (v18+) & **npm**

---

## 🗄️ Database Setup (XAMPP MySQL)

1. Launch the **XAMPP Control Panel**.
2. Click **Start** for both **Apache** and **MySQL**.
3. Open **phpMyAdmin** in your browser:
   ```
   http://localhost/phpmyadmin
   ```
4. Create the application database:
   ```sql
   CREATE DATABASE novastore_db
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_unicode_ci;
   ```
5. Ensure your `.env` database parameters are set:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=novastore_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

---

## ⚙️ Installation & Setup

If setting up for the first time:

```bash
# 1. Install PHP dependencies
composer install

# 2. Install Node dependencies
npm install

# 3. Setup environment file (if not existing)
copy .env.example .env

# 4. Generate application key (if not already set)
php artisan key:generate

# 5. Clear and cache configuration
php artisan config:clear

# 6. Run database migrations
php artisan migrate

# 7. Seed initial products and admin account
php artisan db:seed

# 8. Build production frontend assets
npm run build
```

---

## 👤 Default Demo Admin Credentials

You can log in directly with the seeded admin account or register a new account on `/register`:

- **Email**: `admin@novastore.com`
- **Password**: `password123`

---

## 💻 Running the Application Locally

Run Laravel and Vite in two separate terminal windows:

### Terminal 1: Backend Server
```bash
php artisan serve
```
*Server runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)*

### Terminal 2: Frontend Development Server
```bash
npm run dev
```

*Or build static production assets once:*
```bash
npm run build
```

---

## 🗺️ Application Routes

| Method | URI | Name | Middleware | Description |
|---|---|---|---|---|
| `GET` | `/` | `home` | `web` | Public storefront with search & MySQL catalog |
| `GET` | `/login` | `login` | `guest` | User sign-in page |
| `POST` | `/login` | `login` | `guest` | Authenticate user session |
| `POST` | `/logout` | `logout` | `auth` | Invalidate session & log out |
| `GET` | `/register` | `register` | `guest` | User registration page |
| `POST` | `/register` | `register` | `guest` | Store new user account |
| `GET` | `/dashboard` | `dashboard` | `auth` | Admin inventory overview & stats cards |
| `GET` | `/products` | `products.index` | `auth` | Manage products table with search |
| `GET` | `/products/create`| `products.create` | `auth` | Product creation form |
| `POST` | `/products` | `products.store` | `auth` | Persist new product to MySQL |
| `GET` | `/products/{id}/edit`| `products.edit` | `auth` | Edit product form |
| `PUT` | `/products/{id}` | `products.update` | `auth` | Update product in MySQL |
| `DELETE`| `/products/{id}` | `products.destroy` | `auth` | Delete product from MySQL |

---

## 🧪 Automated Testing

Automated tests run against an isolated in-memory SQLite database, protecting your real `novastore_db` MySQL database from accidental data loss:

```bash
php artisan test
```

All 33 feature tests (Authentication, Product CRUD, Route Protection, Stock Thresholds, Validation) pass with 86 assertions.

---

## 🔧 Troubleshooting Guide

| Issue | Cause | Solution |
|---|---|---|
| **could not find driver** | `pdo_mysql` extension is disabled in PHP CLI | Edit `php.ini` and remove the semicolon `;` before `extension=pdo_mysql`. |
| **Access denied for user 'root'@'localhost'** | MySQL password mismatch | Check if your XAMPP MySQL root has a password. If yes, update `DB_PASSWORD` in `.env`. |
| **Unknown database 'novastore_db'** | Database does not exist yet in MySQL | Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin) and run `CREATE DATABASE novastore_db;`. |
| **Connection refused (Port 3306)** | MySQL service is stopped in XAMPP | Open XAMPP Control Panel and click **Start** next to MySQL. Verify port 3306. |
| **Specified key was too long; max key length is 1000 bytes** | Default string length in older MariaDB / utf8mb4 | Already resolved in `AppServiceProvider.php` via `Schema::defaultStringLength(191)`. |
| **Vite manifest not found** | Frontend assets have not been built | Run `npm run build` or start `npm run dev`. |
| **419 Page Expired** | Expired CSRF token / session cookie | Refresh the page. Verify `SESSION_DRIVER=database` or `file` in `.env`. |
