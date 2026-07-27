import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../../services/productService';

const emptyForm = {
  name: '', description: '', price: '', discountPercentage: 0, images: '',
  category: '', brand: '', stock: '', ratings: 0,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    getProducts({ search, page, limit: 10 })
      .then((r) => { setProducts(r.data); setPagination(r.pagination); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [search, page]);
  useEffect(() => { getCategories().then((r) => setCategories(r.data)); }, []);

  const openCreate = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (p) => {
    setForm({ ...p, images: p.images.join(', ') });
    setEditingId(p._id);
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      discountPercentage: Number(form.discountPercentage),
      stock: Number(form.stock),
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success('Product updated');
      } else {
        await createProduct(payload);
        toast.success('Product created');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    toast.success('Product deleted');
    load();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button onClick={openCreate} className="btn-primary">+ Add Product</button>
      </div>

      <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..." className="input mb-4 max-w-sm" />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-800">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">Loading...</td></tr>
            ) : products.map((p) => (
              <tr key={p._id} className="border-b border-gray-100 dark:border-gray-900">
                <td className="p-3"><img src={p.images?.[0]} alt="" className="h-10 w-10 rounded-lg object-cover" /></td>
                <td className="p-3 max-w-xs truncate">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">₹{p.price.toLocaleString('en-IN')}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => openEdit(p)} className="text-brand-600 hover:underline">Edit</button>
                  <button onClick={() => remove(p._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={submit} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-bold">{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <div className="space-y-3">
              <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input h-20" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" />
                <input type="number" placeholder="Discount %" value={form.discountPercentage} onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })} className="input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                  <option value="">Select Category</option>
                  {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>
                <input required placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input" />
              </div>
              <input required type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input" />
              <input placeholder="Image URLs (comma separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="input" />
            </div>
            <div className="mt-6 flex gap-2">
              <button className="btn-primary flex-1">Save</button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
