import { getToken } from 'firebase/messaging';
import { messaging } from '../../config/firebase.config';
import { BASE_API_URL } from '../../utils/constants';

export const handleGetDeviceToken = async (userEmail: string) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      await fetch(`${BASE_API_URL}/notification/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('idToken')}`,
        },
        body: JSON.stringify({
          email: userEmail,
          deviceToken: token,
        }),
      });
    }
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};
