import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProducts, getCategories } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const heroSlides = [
  { title: 'Big Electronics Sale', subtitle: 'Up to 30% off on phones, laptops & audio', color: 'from-indigo-600 to-brand-500' },
  { title: "New Season Fashion", subtitle: 'Fresh styles from Nike, Adidas & more', color: 'from-fuchsia-600 to-rose-500' },
  { title: 'Home & Kitchen Essentials', subtitle: 'Upgrade your home for less', color: 'from-emerald-600 to-teal-500' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [deals, setDeals] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [featuredRes, dealsRes, newRes, catRes] = await Promise.all([
          getProducts({ sort: 'rating', limit: 8 }),
          getProducts({ sort: 'priceLowToHigh', limit: 8 }),
          getProducts({ sort: 'newest', limit: 8 }),
          getCategories(),
        ]);
        setFeatured(featuredRes.data);
        setDeals(dealsRes.data);
        setNewArrivals(newRes.data);
        setCategories(catRes.data);
      } catch (err) {
        toast.error('Could not load home page data. Is the backend running?');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${heroSlides[slide].color} transition-all duration-700`}>
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-20 text-white">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">Limited Time Offer</span>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">{heroSlides[slide].title}</h1>
            <p className="max-w-md text-white/90">{heroSlides[slide].subtitle}</p>
            <Link to="/products" className="mt-2 rounded-xl bg-white px-6 py-3 font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5">
              Shop Now →
            </Link>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        {/* Popular Categories */}
        <section className="py-12">
          <h2 className="mb-6 text-2xl font-bold">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c._id}
                to={`/products?category=${encodeURIComponent(c.name)}`}
                className="card group flex flex-col items-center gap-3 p-4 text-center"
              >
                <img src={c.image} alt={c.name} className="h-20 w-full rounded-xl object-cover transition-transform group-hover:scale-105" />
                <span className="text-sm font-semibold">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <Section title="Featured Products" loading={loading} products={featured} />
        {/* Today's Deals */}
        <Section title="Today's Deals" loading={loading} products={deals} />
        {/* New Arrivals */}
        <Section title="New Arrivals" loading={loading} products={newArrivals} />

        {/* Newsletter */}
        <section className="my-16 rounded-3xl bg-gradient-to-r from-brand-700 to-brand-500 p-10 text-center text-white shadow-card">
          <h2 className="text-2xl font-bold">Get exclusive deals in your inbox</h2>
          <p className="mt-2 text-white/90">Subscribe to our newsletter and never miss a sale.</p>
          <form className="mx-auto mt-6 flex max-w-md gap-2" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed!'); }}>
            <input type="email" required placeholder="you@example.com" className="input flex-1 !bg-white !text-gray-900" />
            <button className="rounded-xl bg-gray-900 px-5 py-2.5 font-semibold text-white hover:bg-black">Subscribe</button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Section({ title, products, loading }) {
  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to="/products" className="text-sm font-semibold text-brand-600 hover:underline">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </section>
  );
}
