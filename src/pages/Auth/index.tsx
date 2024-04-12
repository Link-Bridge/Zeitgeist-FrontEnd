import { signInWithPopup } from 'firebase/auth';
import loginImage from '../../assets/images/login_image.png';
import googleImage from '../../assets/images/google-logo.webp';
import Button from '@mui/joy/Button';
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
      className="bg-cover bg-center h-screen" 
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="flex justify-end pr-16 pt-10"> 
        <Button 
          onClick={signInWithGoogle}
          sx={{
            backgroundColor: 'white',    
            color: 'black',             
            borderRadius: '9999px',     
            ':hover': {                 
              backgroundColor: '#f0f0f0' 
            },
            paddingX: '40px',
            paddingY: '16px',
          }}
          startDecorator={
            <img src={googleImage} alt="Google" style={{ width: 24, height: 24 }} />
          }
          size="lg"
        >
          Sign in to LinkBridge with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
