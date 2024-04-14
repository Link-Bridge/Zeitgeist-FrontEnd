import { signInWithPopup } from 'firebase/auth';
import loginImage from '../../assets/images/login_image.png';
import googleImage from '../../assets/images/google-logo.webp';
import Button from '@mui/joy/Button';
import { auth, provider } from '../../config/firebase.config';

const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();  

      const { displayName, email, photoURL } = result.user;

      if (!displayName) {
        console.error('No display name available from Google account.');
        return; 
      }

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

      const response = await fetch('http://localhost:3000/create/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          imageUrl: photoURL
        })  
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Firebase Sign-in error:', error);
    }
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${loginImage})` }}>
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
          startDecorator={<img src={googleImage} alt="Google" style={{ width: 24, height: 24 }} />}
          size="lg"
        >
          Sign in to LinkBridge with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
