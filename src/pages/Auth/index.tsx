import Button from '@mui/joy/Button';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import googleImage from '../../assets/images/google-logo.webp';
import loginImage from '../../assets/images/login_image.png';
import { auth, provider } from '../../config/firebase.config';
import useHttp from '../../hooks/useHttp';
import { RoutesPath } from '../../utils/constants';

// Tipos para los datos del empleado
interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, loading, sendRequest } = useHttp<EmployeeData>('/employee/create', 'POST');

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      sessionStorage.setItem('idToken', token); // ¿cambiar a localStorage?

      const { displayName, email, photoURL } = result.user;
      if (!displayName || !email || !photoURL) throw new Error('Missing required user information');

      const nameParts = displayName.trim().split(/\s+/);
      let firstName, lastName;

      if (nameParts.length === 2) {
        [firstName, lastName] = nameParts;
      } else if (nameParts.length === 3) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
      } else if (nameParts.length >= 4) {
        firstName = nameParts.slice(0, 2).join(' ');
        lastName = nameParts.slice(2).join(' ');
      } else {
        firstName = displayName;
        lastName = '';
      }

      await sendRequest(
        {},
        { firstName, lastName, email, imageUrl: photoURL },
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );
      navigate(RoutesPath.HOME);
    } catch (error) {
      console.error('Firebase Sign-in error:', error);
    }
  };

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${loginImage})` }}>
      <div className='flex justify-end pr-16 pt-10'>
        <Button
          onClick={signInWithGoogle}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '9999px',
            ':hover': {
              backgroundColor: '#f0f0f0',
            },
            paddingX: '40px',
            paddingY: '16px',
          }}
          startDecorator={<img src={googleImage} alt='Google' style={{ width: 24, height: 24 }} />}
          size='lg'
        >
          Sign in to LinkBridge with Google
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Employee created successfully!</p>}
      </div>
    </div>
  );
};

export default Auth;
