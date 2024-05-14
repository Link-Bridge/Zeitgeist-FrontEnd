import { getToken } from 'firebase/messaging';
import { messaging } from '../../config/firebase.config';
import { axiosInstance } from '../../lib/axios/axios';
import { BASE_API_URL } from '../../utils/constants';

export const handleGetDeviceToken = async (userEmail: string) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      await axiosInstance.post(`${BASE_API_URL}/notification/token`, {
        email: userEmail,
        deviceToken: token,
      });
    }
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};
