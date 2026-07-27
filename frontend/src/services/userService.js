import api from './api';

export const getProfile = () => api.get('/users/profile').then((r) => r.data);
export const updateProfile = (payload) => api.put('/users/profile', payload).then((r) => r.data);
export const addAddress = (payload) => api.post('/users/addresses', payload).then((r) => r.data);
export const deleteAddress = (id) => api.delete(`/users/addresses/${id}`).then((r) => r.data);
export const toggleWishlist = (productId) => api.post(`/users/wishlist/${productId}`).then((r) => r.data);

export const getAllUsers = (params) => api.get('/users/admin/all', { params }).then((r) => r.data);
export const toggleBlockUser = (id) => api.put(`/users/admin/${id}/block`).then((r) => r.data);
