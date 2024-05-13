import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

const useAutoRefreshToken = () => {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const auth = getAuth();
        if (auth.currentUser) {
          auth.currentUser
            .getIdToken(true)
            .then(token => {
              console.log('Token refreshed:', token);
              localStorage.setItem('idToken', token);
            })
            .catch(error => {
              console.error('Error refreshing token:', error);
            });
        }
      },
      30 * 60 * 1000
    ); // 30 minutos

    return () => clearInterval(interval);
  }, []);
};

export default useAutoRefreshToken;
