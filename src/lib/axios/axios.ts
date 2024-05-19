import axios from 'axios';
import { auth } from '../../config/firebase.config';
import { BASE_API_URL } from '../../utils/constants';

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await auth.currentUser?.getIdToken(true);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        originalRequest._retry = true;
        try {
          const newToken = await currentUser.getIdToken(true);
          localStorage.setItem('idToken', newToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          return Promise.reject(refreshError);
        }
      } else {
        console.error('User not logged in');
        return Promise.reject(new Error('User not logged in'));
      }
    }
    return Promise.reject(error);
  }
);
