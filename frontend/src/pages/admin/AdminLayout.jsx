import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/products', label: '📦 Products' },
  { to: '/admin/categories', label: '🏷️ Categories' },
  { to: '/admin/orders', label: '🧾 Orders' },
  { to: '/admin/users', label: '👥 Users' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl gap-6 px-4 py-8">
      <aside className="card sticky top-20 h-fit w-56 shrink-0 p-3">
        <div className="mb-4 px-2">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="font-bold">{user?.name}</p>
        </div>
        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-4 w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
          🚪 Logout
        </button>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
