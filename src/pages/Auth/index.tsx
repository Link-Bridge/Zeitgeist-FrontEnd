import Button from '@mui/joy/Button';
import { signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
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
  const [user, setUser] = useState<EmployeeReponse>();
  const [idToken, setIdToken] = useState<string>('');
  const navigate = useNavigate();
  const { setEmployee } = useContext(EmployeeContext);
  const { setState } = useContext(SnackbarContext);
  const { sendRequest, data } = useHttp<EmployeeReponse>('/employee/signup', RequestMethods.POST);

  const createUser = async () => {
    sendRequest({}, {});
    setEmployee(data!);
    setUser(data!);
    if (user?.role !== 'No role') {
      navigate(RoutesPath.HOME);
    } else {
      setState({ open: true, message: 'User not authorized', type: 'danger' });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setIdToken(token);
      localStorage.setItem('idToken', idToken);
      createUser();
      handleGetDeviceToken(user!.employee.email);
    } catch (error) {
      console.error('Error signing in with google:', error);
      setState({ open: true, message: 'Failed to sign in with google', type: 'danger' });
      throw error;
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {

  //     if (!response.ok) {
  //       throw new Error('Failed to sign up');
  //     }

  //     const responseData = await response.json();
  //     setEmployee(responseData.data);
  //     localStorage.setItem('employee', JSON.stringify(responseData.data));

  //     if (responseData.data.role === 'No role' || !responseData.data.role) {
  //       throw new Error('User not authorized');
  //     }

  //     handleGetDeviceToken(result.user.email);

  //     navigate(RoutesPath.HOME);
  //   } catch (error) {
  //     setState({ open: true, message: (error as Error).message, type: 'danger' });
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     if (data && idToken) {
  //       setUser(data);
  //       if (data.employee) {
  //         setEmployee(data);
  //       }
  //       localStorage.setItem('employee', JSON.stringify(data));
  //       if (data.role === 'No role' || !data.role) {
  //         setState({ open: true, message: 'User not authorized', type: 'danger' });
  //       }
  //       handleGetDeviceToken(data.employee.email);
  //       navigate(RoutesPath.HOME);
  //     }
  //   } catch (error) {
  //     console.error('Error signing in with google:', error);
  //     setState({ open: true, message: 'Failed to sign in with google', type: 'danger' });
  //     throw error;
  //   }
  // }, [data, navigate, idToken, setState, setEmployee]);

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
