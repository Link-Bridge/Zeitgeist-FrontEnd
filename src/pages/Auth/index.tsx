import Button from '@mui/joy/Button';
import { signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import googleImage from '../../assets/images/google-logo.webp';
import { auth, provider } from '../../config/firebase.config';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import { axiosInstance } from '../../lib/axios/axios';
import { EmployeeReponse } from '../../types/employee';
import { BASE_API_URL, RoutesPath } from '../../utils/constants';
import { handleGetDeviceToken } from './device-token';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setEmployee } = useContext(EmployeeContext);
  const { setState } = useContext(SnackbarContext);

  const sendRequest = async () => {
    try {
      const response = await axiosInstance.post(`${BASE_API_URL}/employee/signup`);

      return response.data as EmployeeReponse;
    } catch (error) {
      setState({ open: true, message: 'Oops! we are having some troubles', type: 'danger' });
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
      if (!response) {
        setState({ open: true, message: 'Oops! we are having some troubles', type: 'danger' });
        return;
      }
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

  return (
    <div className='bg-cover bg-center h-screen login-bg'>
      <div className='flex justify-center sm:justify-end p-2 sm:pr-16 pt-10'>
        <Button
          onClick={handleGoogleSignIn}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '999px',
            ':hover': {
              backgroundColor: '#f0f0f0',
            },
            paddingX: '20px',
            paddingY: '16px',
            justifyContent: 'start',
            fontWeight: 'normal',
            fontSize: '14px',
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
