import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProducts, getCategories } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page') || 1);
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({ search, category, sort, page, limit: 12, minPrice, maxPrice })
      .then((r) => {
        setProducts(r.data);
        setPagination(r.pagination);
      })
      .catch(() => toast.error('Could not load products'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sort, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    next.set('page', '1');
    setSearchParams(next);
  };

  const applyPriceFilter = () => {
    const next = new URLSearchParams(searchParams);
    if (minPrice) next.set('minPrice', minPrice); else next.delete('minPrice');
    if (maxPrice) next.set('maxPrice', maxPrice); else next.delete('maxPrice');
    next.set('page', '1');
    setSearchParams(next);
  };

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', p);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-[240px_1fr]">
      {/* Filters sidebar */}
      <aside className="space-y-6">
        <div>
          <h3 className="mb-3 font-bold">Categories</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <button onClick={() => updateParam('category', '')} className={`w-full rounded-lg px-2 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${!category ? 'font-bold text-brand-600' : ''}`}>
                All Categories
              </button>
            </li>
            {categories.map((c) => (
              <li key={c._id}>
                <button onClick={() => updateParam('category', c.name)} className={`w-full rounded-lg px-2 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${category === c.name ? 'font-bold text-brand-600' : ''}`}>
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Price Range (₹)</h3>
          <div className="flex items-center gap-2">
            <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" type="number" className="input !py-1.5 text-sm" />
            <span>–</span>
            <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" type="number" className="input !py-1.5 text-sm" />
          </div>
          <button onClick={applyPriceFilter} className="btn-secondary mt-3 w-full !py-1.5 text-sm">Apply</button>
        </div>
      </aside>

      {/* Product grid */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            {search ? `Results for "${search}"` : 'All Products'} — {pagination.total ?? products.length} items
          </p>
          <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="input w-auto !py-1.5 text-sm">
            <option value="newest">Newest</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>

        {!loading && products.length === 0 && (
          <p className="py-20 text-center text-gray-500">No products found. Try a different search or filter.</p>
        )}

        {pagination.pages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: pagination.pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-semibold ${page === i + 1 ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
