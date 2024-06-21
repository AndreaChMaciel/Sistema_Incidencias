// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener y establecer el token CSRF
export const setCSRFToken = (token) => {
  api.defaults.headers.common['X-CSRF-TOKEN'] = token;
};

export default api;
