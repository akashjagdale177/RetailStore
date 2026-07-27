import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="shrink-0 text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">Retail</span>
          <span className="text-gray-800 dark:text-gray-100">Store</span>
        </Link>

        <form onSubmit={submitSearch} className="hidden flex-1 md:flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="input rounded-r-none"
          />
          <button className="rounded-xl rounded-l-none bg-brand-600 px-4 text-white hover:bg-brand-700">
            Search
          </button>
        </form>

        <nav className="ml-auto flex items-center gap-3 text-sm font-medium">
          <Link to="/products" className="hidden hover:text-brand-600 sm:inline">Products</Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          <Link to="/cart" className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="group relative">
              <button className="btn-secondary !px-3 !py-1.5 text-xs">👤 {user.name?.split(' ')[0]}</button>
              <div className="invisible absolute right-0 mt-1 w-44 rounded-xl border border-gray-200 bg-white p-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:opacity-100 dark:border-gray-800 dark:bg-gray-900">
                <Link to="/dashboard" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
                <Link to="/dashboard/orders" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">My Orders</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Admin Panel</Link>
                )}
                <button onClick={logout} className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !px-4 !py-2 text-xs">Login</Link>
          )}
        </nav>
      </div>
      <form onSubmit={submitSearch} className="flex px-4 pb-3 md:hidden">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="input rounded-r-none" />
        <button className="rounded-xl rounded-l-none bg-brand-600 px-4 text-white">Go</button>
      </form>
    </header>
  );
}
