import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const finalPrice = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));

  return (
    <div className="card group flex flex-col overflow-hidden">
      <Link to={`/products/${product._id}`} className="relative block aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-600 px-2 py-1 text-[10px] font-bold text-white">
            -{product.discountPercentage}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
            Out of Stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-brand-600 dark:text-brand-400">{product.brand}</span>
        <Link to={`/products/${product._id}`} className="line-clamp-2 font-semibold hover:text-brand-600">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-sm text-amber-500">
          {'★'.repeat(Math.round(product.ratings || 0))}
          <span className="text-gray-400">({product.numReviews || 0})</span>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-lg font-bold">₹{finalPrice.toLocaleString('en-IN')}</span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="btn-primary mt-3 w-full !py-2 text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
