import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/orderService';

export default function Checkout() {
  const { cart, total, clear } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ fullName: '', phone: '', line1: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [placing, setPlacing] = useState(false);

  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const submitOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const products = cart.items.map((i) => ({
        productId: i.productId, name: i.name, image: i.image, price: i.price, quantity: i.quantity,
      }));
      const res = await placeOrder({ products, address, paymentMethod });
      await clear();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  };

  if (!cart.items?.length) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <form onSubmit={submitOrder} className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-4 font-bold">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} className="input" />
              <input required name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} className="input" />
              <input required name="line1" placeholder="Address Line" value={address.line1} onChange={handleChange} className="input sm:col-span-2" />
              <input required name="city" placeholder="City" value={address.city} onChange={handleChange} className="input" />
              <input required name="state" placeholder="State" value={address.state} onChange={handleChange} className="input" />
              <input required name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="input" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-bold">Payment Method</h2>
            <div className="space-y-2">
              {[
                { id: 'COD', label: 'Cash on Delivery' },
                { id: 'CARD', label: 'Credit / Debit Card' },
                { id: 'UPI', label: 'UPI' },
              ].map((m) => (
                <label key={m.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800">
                  <input type="radio" checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} />
                  {m.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="card h-fit p-6">
          <h2 className="mb-4 font-bold">Order Summary</h2>
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {cart.items.map((i) => (
              <div key={i.productId} className="flex justify-between text-sm">
                <span>{i.name} × {i.quantity}</span>
                <span>₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="my-3 border-t border-gray-200 dark:border-gray-800" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-lg font-bold"><span>Total</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
          </div>
          <button disabled={placing} className="btn-primary mt-6 w-full">{placing ? 'Placing Order...' : 'Place Order'}</button>
        </div>
      </form>
    </div>
  );
}
