import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../../services/orderService';

const statusColor = {
  processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  out_for_delivery: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then((r) => setOrders(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card p-6">Loading orders...</div>;
  if (!orders.length) return <div className="card p-6 text-gray-500">You haven't placed any orders yet.</div>;

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o._id} className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-gray-400">Order #{o._id.slice(-8)}</p>
              <p className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor[o.shippingStatus]}`}>
              {o.shippingStatus.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="mt-3 space-y-1 text-sm">
            {o.products.map((p, i) => (
              <div key={i} className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>{p.name} × {p.quantity}</span>
                <span>₹{(p.price * p.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-bold dark:border-gray-800">
            <span>Total</span>
            <span>₹{o.total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
