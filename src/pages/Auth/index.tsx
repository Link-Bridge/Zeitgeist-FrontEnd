import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase.config';
import loginImage from '../../assets/images/login_image.png';
import { GoogleLogin } from 'react-google-login';

const Auth = () => {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      } catch (error) {
       console.error("Firebase Sign-in error:", error);
      }
  };

  return (
    <div style={{ backgroundImage: `url(${loginImage})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute top-16 right-24 m-4">
        <GoogleLogin
          clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
          buttonText="Sign in to Link Bridge with Google"
          onSuccess={signInWithGoogle}
          //onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
};

export default Auth;
