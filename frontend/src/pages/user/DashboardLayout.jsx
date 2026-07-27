import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { to: '/dashboard', label: 'Profile', end: true },
  { to: '/dashboard/orders', label: 'Orders' },
  { to: '/dashboard/addresses', label: 'Addresses' },
  { to: '/dashboard/wishlist', label: 'Wishlist' },
];

export default function DashboardLayout() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold">My Account</h1>
      <p className="mb-6 text-sm text-gray-500">Welcome back, {user?.name}</p>
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <nav className="card flex flex-row gap-1 overflow-x-auto p-2 md:flex-col">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
