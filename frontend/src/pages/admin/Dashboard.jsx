import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getOrderStats } from '../../services/orderService';
import { getAllUsers } from '../../services/userService';
import { getProducts } from '../../services/productService';

function StatCard({ label, value, icon }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-extrabold">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, recentOrders: [] });
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    getOrderStats().then((r) => setStats(r.data)).catch(() => {});
    getAllUsers({ limit: 1 }).then((r) => setUserCount(r.pagination?.total || 0)).catch(() => {});
    getProducts({ limit: 1 }).then((r) => setProductCount(r.pagination?.total || 0)).catch(() => {});
  }, []);

  // Synthetic weekly trend from recent orders, for a quick visual (real deployments would query time-series)
  const chartData = stats.recentOrders
    .slice()
    .reverse()
    .map((o, i) => ({ name: `#${i + 1}`, total: o.total }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Users" value={userCount} icon="👥" />
        <StatCard label="Total Products" value={productCount} icon="📦" />
        <StatCard label="Total Orders" value={stats.totalOrders} icon="🧾" />
        <StatCard label="Revenue" value={`₹${stats.revenue.toLocaleString('en-IN')}`} icon="💰" />
      </div>

      <div className="card p-6">
        <h2 className="mb-4 font-bold">Recent Order Value Trend</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-gray-500">No orders yet.</p>
        )}
      </div>

      <div className="card p-6">
        <h2 className="mb-4 font-bold">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Payment</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((o) => (
                <tr key={o._id} className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-2 font-mono text-xs">{o._id.slice(-8)}</td>
                  <td className="py-2">₹{o.total.toLocaleString('en-IN')}</td>
                  <td className="py-2 capitalize">{o.paymentStatus}</td>
                  <td className="py-2 capitalize">{o.shippingStatus.replace(/_/g, ' ')}</td>
                  <td className="py-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
