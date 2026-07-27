import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();
  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;

  if (!cart.items?.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="text-6xl">🛒</div>
        <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.productId} className="card flex items-center gap-4 p-4">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center rounded-xl border border-gray-300 dark:border-gray-700">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-1.5">−</button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-1.5">+</button>
              </div>
              <span className="w-24 text-right font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              <button onClick={() => removeItem(item.productId)} className="text-red-500 hover:text-red-700" title="Remove">✕</button>
            </div>
          ))}
        </div>

        <div className="card h-fit p-6">
          <h2 className="mb-4 font-bold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Tax (5%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-gray-500"><span>Discount</span><span>−₹0</span></div>
            <div className="my-2 border-t border-gray-200 dark:border-gray-800" />
            <div className="flex justify-between text-lg font-bold"><span>Total</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary mt-6 w-full">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
