import axios from 'axios';

// __GATEWAY_URL__ is injected by vite.config.js from ../credentials/urls.json
// This is the ONLY line in the whole frontend that knows about the backend host.
// eslint-disable-next-line no-undef
const GATEWAY_URL = typeof __GATEWAY_URL__ !== 'undefined' ? __GATEWAY_URL__ : 'http://localhost:5000';

const api = axios.create({
  baseURL: `${GATEWAY_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('retailstore_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('retailstore_token');
      localStorage.removeItem('retailstore_user');
    }
    return Promise.reject(err);
  }
);

export const GATEWAY_BASE = GATEWAY_URL;
export default api;
