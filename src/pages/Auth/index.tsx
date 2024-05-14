import Button from '@mui/joy/Button';
import { signInWithPopup } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import googleImage from '../../assets/images/google-logo.webp';
import loginImage from '../../assets/images/login-image.png';
import { auth, provider } from '../../config/firebase.config';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import { EmployeeReponse } from '../../types/employee';
import { BASE_API_URL, RoutesPath } from '../../utils/constants';
import { handleGetDeviceToken } from './device-token';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setEmployee } = useContext(EmployeeContext);
  const { setState } = useContext(SnackbarContext);

  const sendRequest = async () => {
    const idToken = localStorage.getItem('idToken');
    const response = await fetch(`${BASE_API_URL}/employee/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    return JSON.parse(await response.text()) as EmployeeReponse;
  };

  const refreshToken = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem('idToken', token);
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);
      const refreshToken = result.user.refreshToken;
      localStorage.setItem('idToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      const response = await sendRequest();
      await updateUserContext(response);
    } catch (error) {
      setState({ open: true, message: 'Oops! we are having some troubles', type: 'danger' });
    }
  };

  const updateUserContext = async (data: EmployeeReponse) => {
    if (data) {
      if (data.data.role !== 'No role') {
        setEmployee(data.data);
        localStorage.setItem('employee', JSON.stringify(data.data));
        navigate(RoutesPath.HOME);
        handleGetDeviceToken(data.data.employee.email);
      } else {
        setState({
          open: true,
          message: 'User not authorized',
          type: 'danger',
        });
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(refreshToken, 1800);
    return () => clearInterval(intervalId);
  }, []);

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
