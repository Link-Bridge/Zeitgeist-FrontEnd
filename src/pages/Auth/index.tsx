import Button from '@mui/joy/Button';
import { signInWithPopup } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import googleImage from '../../assets/images/google-logo.webp';
import loginImage from '../../assets/images/login-image.png';
import { auth, provider } from '../../config/firebase.config';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';
import { EmployeeReponse } from '../../types/employee';
import { RequestMethods, RoutesPath } from '../../utils/constants';
import { handleGetDeviceToken } from './device-token';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setEmployee } = useContext(EmployeeContext);
  const { setState } = useContext(SnackbarContext);
  const { sendRequest, data, loading } = useHttp<EmployeeReponse>(
    '/employee/signup',
    RequestMethods.POST
  );

  const refreshToken = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem('idToken', token);
        console.log('Token refreshed!');
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

      await sendRequest({}, {});
      console.log('data ', data);
      if (!loading) {
        updateUserContext();
      }
    } catch (error) {
      setState({ open: true, message: 'Oops! we are having some troubles', type: 'danger' });
    }
  };

  const updateUserContext = async () => {
    if (data) {
      if (data.data.role !== 'No role') {
        console.log('data ', data);
        setEmployee(data.data);
        localStorage.setItem('employee', JSON.stringify(data));
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
    const intervalId = setInterval(refreshToken, 18000);
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
