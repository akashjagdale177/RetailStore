import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductById, addReview } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  const load = () => {
    setLoading(true);
    getProductById(id)
      .then((r) => {
        setProduct(r.data.product);
        setRelated(r.data.related);
        setActiveImg(0);
      })
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return toast.error('Please login to leave a review');
    try {
      await addReview(id, { userName: user.name, ...reviewForm });
      toast.success('Review submitted!');
      setReviewForm({ rating: 5, comment: '' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit review');
    }
  };

  if (loading) return <div className="py-32 text-center text-gray-400">Loading product...</div>;
  if (!product) return <div className="py-32 text-center text-gray-400">Product not found.</div>;

  const finalPrice = Math.round(product.price * (1 - (product.discountPercentage || 0) / 100));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="card mb-3 aspect-square overflow-hidden">
            <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${i === activeImg ? 'border-brand-600' : 'border-transparent'}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">{product.brand}</span>
          <h1 className="mt-1 text-3xl font-extrabold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={product.ratings} />
            <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">₹{finalPrice.toLocaleString('en-IN')}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900 dark:text-green-300">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300">{product.description}</p>

          <p className="mt-4 text-sm">
            Stock:{' '}
            {product.stock > 0 ? (
              <span className="font-semibold text-green-600">{product.stock} available</span>
            ) : (
              <span className="font-semibold text-red-600">Out of stock</span>
            )}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-gray-300 dark:border-gray-700">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2">−</button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
            </div>
            <button onClick={() => addItem(product, qty)} disabled={product.stock === 0} className="btn-primary flex-1">
              Add to Cart
            </button>
            <Link to="/cart" onClick={() => addItem(product, qty)} className="btn-secondary flex-1 text-center">
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="mb-4 text-xl font-bold">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet. Be the first!</p>}
          {product.reviews.map((r, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.userName}</span>
                <StarRating value={r.rating} size="text-sm" />
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{r.comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={submitReview} className="card mt-6 space-y-3 p-4">
          <h3 className="font-semibold">Write a review</h3>
          <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })} className="input w-32">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Star{n > 1 && 's'}</option>)}
          </select>
          <textarea
            required
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            placeholder="Share your thoughts about this product..."
            className="input h-24"
          />
          <button className="btn-primary">Submit Review</button>
        </form>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
