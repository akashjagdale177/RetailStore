import api from './api';

export const getCart = () => api.get('/cart').then((r) => r.data);
export const addToCart = (payload) => api.post('/cart', payload).then((r) => r.data);
export const updateCartItem = (productId, quantity) => api.put(`/cart/${productId}`, { quantity }).then((r) => r.data);
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`).then((r) => r.data);
export const clearCart = () => api.delete('/cart').then((r) => r.data);
