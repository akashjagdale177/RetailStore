import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email: form.email, username: form.email, password: form.password });
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch {
      // toast handled in context
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="card p-8">
        <h1 className="text-2xl font-extrabold">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-500">Login to continue shopping.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input required type="text" placeholder="Email (or admin username)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" />
          <button disabled={loading} className="btn-primary w-full">{loading ? 'Logging in...' : 'Login'}</button>
        </form>

        <p className="mt-2 text-xs text-gray-400">Admin demo login: <b>akash</b> / <b>123</b></p>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="font-semibold text-brand-600">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
