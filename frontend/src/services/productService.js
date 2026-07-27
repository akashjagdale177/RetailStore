import api from './api';

export const getProducts = (params) => api.get('/products', { params }).then((r) => r.data);
export const getProductById = (id) => api.get(`/products/${id}`).then((r) => r.data);
export const addReview = (id, payload) => api.post(`/products/${id}/reviews`, payload).then((r) => r.data);
export const getCategories = () => api.get('/categories').then((r) => r.data);

export const createProduct = (payload) => api.post('/products', payload).then((r) => r.data);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);
export const createCategory = (payload) => api.post('/categories', payload).then((r) => r.data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`).then((r) => r.data);
