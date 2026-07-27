import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';

const shippingOptions = ['processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
const paymentOptions = ['pending', 'paid', 'failed'];

const statusColor = {
  processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  out_for_delivery: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllOrders({ page, limit: 10 })
      .then((r) => { setOrders(r.data); setPagination(r.pagination); })
      .finally(() => setLoading(false));
  };

  useEffect(load, [page]);

  const changeStatus = async (id, field, value) => {
    try {
      await updateOrderStatus(id, { [field]: value });
      toast.success('Order updated');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Order Management</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Shipping Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">Loading...</td></tr>
            ) : orders.map((o) => (
              <tr key={o._id} className="border-b border-gray-100 dark:border-gray-900">
                <td className="p-3 font-mono text-xs">{o._id.slice(-8)}</td>
                <td className="p-3">{o.address?.fullName}</td>
                <td className="p-3">₹{o.total.toLocaleString('en-IN')}</td>
                <td className="p-3">
                  <select
                    value={o.paymentStatus}
                    onChange={(e) => changeStatus(o._id, 'paymentStatus', e.target.value)}
                    className={`rounded-lg border-0 px-2 py-1 text-xs font-semibold capitalize ${statusColor[o.shippingStatus] || ''}`}
                  >
                    {paymentOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={o.shippingStatus}
                    onChange={(e) => changeStatus(o._id, 'shippingStatus', e.target.value)}
                    className={`rounded-lg border-0 px-2 py-1 text-xs font-semibold capitalize ${statusColor[o.shippingStatus]}`}
                  >
                    {shippingOptions.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                  </select>
                </td>
                <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`h-8 w-8 rounded-lg text-sm ${page === i + 1 ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
