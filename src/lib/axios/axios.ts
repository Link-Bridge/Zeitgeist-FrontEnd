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
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async user => {
        if (user) {
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
          resolve(config);
        } else {
          console.error('User not logged in');
          reject('User not logged in');
        }
      });
    });
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
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
