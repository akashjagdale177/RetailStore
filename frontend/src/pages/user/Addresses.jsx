import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProfile, addAddress, deleteAddress } from '../../services/userService';

const empty = { label: 'Home', fullName: '', phone: '', line1: '', city: '', state: '', pincode: '' };

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);

  const load = () => getProfile().then((r) => setAddresses(r.data.addresses));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addAddress(form);
      toast.success('Address added');
      setForm(empty);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add address');
    }
  };

  const remove = async (id) => {
    await deleteAddress(id);
    toast.success('Address removed');
    load();
  };

  return (
    <div className="space-y-4">
      {addresses.map((a) => (
        <div key={a._id} className="card flex items-start justify-between p-5">
          <div>
            <p className="font-semibold">{a.label} — {a.fullName}</p>
            <p className="text-sm text-gray-500">{a.line1}, {a.city}, {a.state} - {a.pincode}</p>
            <p className="text-sm text-gray-500">{a.phone}</p>
          </div>
          <button onClick={() => remove(a._id)} className="text-red-500 hover:text-red-700">Remove</button>
        </div>
      ))}

      {showForm ? (
        <form onSubmit={submit} className="card space-y-3 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="Label (Home/Work)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="input" />
            <input required placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
            <input required placeholder="Address Line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="input" />
            <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input" />
            <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="input" />
            <input required placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="input" />
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Save Address</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="btn-secondary">+ Add New Address</button>
      )}
    </div>
  );
}
