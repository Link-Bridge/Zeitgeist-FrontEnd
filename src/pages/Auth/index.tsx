import { signInWithPopup } from 'firebase/auth';
import loginImage from '../../assets/images/login_image.png';
import { auth, provider } from '../../config/firebase.config';

const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.error('Firebase Sign-in error:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginImage})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button onClick={signInWithGoogle} className='absolute top-16 right-24 m-4'>
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
