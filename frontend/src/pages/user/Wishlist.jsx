import React, { useEffect, useState } from 'react';
import { getProfile } from '../../services/userService';
import { getProductById } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then(async (r) => {
      const ids = r.data.wishlist || [];
      const results = await Promise.all(ids.map((id) => getProductById(id).then((res) => res.data.product).catch(() => null)));
      setProducts(results.filter(Boolean));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!products.length) return <div className="card p-6 text-gray-500">Your wishlist is empty. Tap the heart on any product to save it here.</div>;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
