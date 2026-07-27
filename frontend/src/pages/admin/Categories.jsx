import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCategories, createCategory, deleteCategory } from '../../services/productService';

const empty = { name: '', slug: '', image: '', description: '' };

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    getCategories().then((r) => setCategories(r.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await createCategory({ ...form, slug });
      toast.success('Category created');
      setForm(empty);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create category');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this category? Products in it will remain but lose their category link.')) return;
    try {
      await deleteCategory(id);
      toast.success('Category deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete category');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary">
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card mb-6 space-y-3 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="Category Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            <input placeholder="Slug (auto if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input sm:col-span-2" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input sm:col-span-2" />
          </div>
          <button className="btn-primary">Save Category</button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((c) => (
            <div key={c._id} className="card overflow-hidden">
              {c.image && <img src={c.image} alt={c.name} className="h-24 w-full object-cover" />}
              <div className="p-3">
                <p className="font-semibold">{c.name}</p>
                <p className="truncate text-xs text-gray-400">{c.slug}</p>
                <button onClick={() => remove(c._id)} className="mt-2 text-xs font-semibold text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
