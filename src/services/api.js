import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

export const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers['x-access-token'] = token;
  return config;
});
