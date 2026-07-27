import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await cartService.getCart();
      setCart(res.data);
    } catch {
      // silently ignore - cart is not critical for browsing
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your cart');
      return;
    }
    try {
      const res = await cartService.addToCart({
        productId: product._id,
        name: product.name,
        image: product.images?.[0],
        price: product.finalPrice ?? product.price,
        quantity,
      });
      setCart(res.data);
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add to cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await cartService.updateCartItem(productId, quantity);
      setCart(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await cartService.removeFromCart(productId);
      setCart(res.data);
      toast.success('Removed from cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not remove item');
    }
  };

  const clear = async () => {
    try {
      const res = await cartService.clearCart();
      setCart(res.data);
    } catch {
      // ignore
    }
  };

  const itemCount = cart.items?.reduce((s, i) => s + i.quantity, 0) || 0;
  const total = cart.items?.reduce((s, i) => s + i.price * i.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{ cart, loading, addItem, updateQuantity, removeItem, clear, refreshCart, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
