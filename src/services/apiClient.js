import axios from 'axios';
import { authService } from './authService';

const BASE_URL = 'https://api.landvestinfra.com/api/v1';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM5NmFjODE0MmQxMzU0NDhhZjM3MCIsInJvbGUiOnsiX2lkIjoiNjk4YzYxYjk1MGY2ZjgyZDdiYWY2NTU2IiwibmFtZSI6IkFkbWluIiwiY29kZSI6IjEifSwiaWF0IjoxNzcwOTk5OTc2LCJleHAiOjE3NzEwMTc5NzZ9.hvPZsAmMBrhi3vnJKR59BbwzG3FBn0SCirlIuHjqSf4';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = authService.getToken() || STATIC_TOKEN;
  config.headers.Authorization = `Bearer ${token}`;
  
  // Don't set Content-Type for FormData, let browser set it with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  
  return config;
});

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      authService.logout();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
