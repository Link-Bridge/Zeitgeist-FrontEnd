import Button from '@mui/joy/Button';
import { signInWithPopup } from 'firebase/auth';
import { getToken } from 'firebase/messaging';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import googleImage from '../../assets/images/google-logo.webp';
import loginImage from '../../assets/images/login-image.png';
import { auth, messaging, provider } from '../../config/firebase.config';
import { EmployeeContext } from '../../hooks/employeeContext';
import { RoutesPath } from '../../utils/constants';

const Auth: React.FC = () => {
  const API_BASE_ROUTE = import.meta.env.VITE_BASE_API_URL;
  const navigate = useNavigate();

  const { setEmployee } = useContext(EmployeeContext);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      sessionStorage.setItem('idToken', idToken);

      // TODO: Had trouble using the useHttp hook

      const response = await fetch(`${API_BASE_ROUTE}/employee/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const responseData = await response.json();

      setEmployee(responseData.data);
      handleGetDeviceToken(result.user.email);

      navigate(RoutesPath.HOME);
    } catch (error) {
      console.error('Firebase Sign-in error:', error);
      throw error;
    }
  };

  const handleGetDeviceToken = async (userEmail: string | null) => {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        await fetch(`${API_BASE_ROUTE}/notification/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('idToken'),
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

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${loginImage})` }}>
      <div className='flex justify-end pr-16 pt-10'>
        <Button
          onClick={handleGoogleSignIn}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '999px',
            ':hover': {
              backgroundColor: '#f0f0f0',
            },
            paddingX: '40px',
            paddingY: '16px',
            justifyContent: 'start',
            fontWeight: 'normal',
            fontSize: '16px',
          }}
          startDecorator={<img src={googleImage} alt='Google' style={{ width: 24, height: 24 }} />}
          size='lg'
        >
          Sign in to Link Bridge with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
