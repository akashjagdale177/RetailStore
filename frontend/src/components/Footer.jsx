import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4">
        <div>
          <h4 className="mb-3 font-bold">RetailStore</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your one-stop shop for everything, built as a microservices reference app.</p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/products" className="hover:text-brand-500">All Products</Link></li>
            <li><Link to="/products?sort=newest" className="hover:text-brand-500">New Arrivals</Link></li>
            <li><Link to="/products?sort=priceLowToHigh" className="hover:text-brand-500">Deals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Account</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/dashboard" className="hover:text-brand-500">Dashboard</Link></li>
            <li><Link to="/dashboard/orders" className="hover:text-brand-500">Orders</Link></li>
            <li><Link to="/login" className="hover:text-brand-500">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400 dark:border-gray-800">
        © {new Date().getFullYear()} RetailStore. Built for learning microservices & DevOps.
      </div>
    </footer>
  );
}
