import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orderService';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then((r) => setOrder(r.data)).catch(() => {});
  }, [id]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="text-6xl">✅</div>
      <h1 className="mt-4 text-3xl font-extrabold">Order Confirmed!</h1>
      <p className="mt-2 text-gray-500">Thank you for shopping with us. Your order is being processed.</p>
      {order && (
        <div className="card mt-8 p-6 text-left">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="mb-3 font-mono text-sm">{order._id}</p>
          <p className="text-sm text-gray-500">Total</p>
          <p className="mb-3 text-xl font-bold">₹{order.total.toLocaleString('en-IN')}</p>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p>{order.paymentMethod}</p>
        </div>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/dashboard/orders" className="btn-secondary">View My Orders</Link>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
