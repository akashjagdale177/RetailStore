import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProfile, updateProfile } from '../../services/userService';

export default function Profile() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((r) => setForm({ name: r.data.name, phone: r.data.phone || '', email: r.data.email })).finally(() => setLoading(false));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name: form.name, phone: form.phone });
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="card p-6">Loading...</div>;

  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <h2 className="font-bold">Profile Settings</h2>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="input" />
      <input value={form.email} disabled className="input opacity-60" />
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="input" />
      <button className="btn-primary">Save Changes</button>
    </form>
  );
}
