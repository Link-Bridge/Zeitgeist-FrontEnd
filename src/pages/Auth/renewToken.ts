import { auth } from '../../config/firebase.config';

export const renewToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    localStorage.setItem('idToken', token);
  }
};

setInterval(renewToken, 45 * 60 * 1000); // Cada 45 minutos
