// axiosInstance.js
import axios from 'axios';
import { BASE_URL } from './endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Update with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if you're using cookies for auth
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization =token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: redirect to login or logout
      console.warn('Unauthorized: Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
