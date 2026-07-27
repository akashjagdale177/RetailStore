import api from './api';

export const placeOrder = (payload) => api.post('/orders', payload).then((r) => r.data);
export const getMyOrders = () => api.get('/orders').then((r) => r.data);
export const getOrderById = (id) => api.get(`/orders/${id}`).then((r) => r.data);

export const getAllOrders = (params) => api.get('/orders/admin/all', { params }).then((r) => r.data);
export const getOrderStats = () => api.get('/orders/admin/stats').then((r) => r.data);
export const updateOrderStatus = (id, payload) => api.put(`/orders/${id}/status`, payload).then((r) => r.data);
