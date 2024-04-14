import { signInWithPopup } from 'firebase/auth';
import loginImage from '../../assets/images/login_image.png';
import googleImage from '../../assets/images/google-logo.webp';
import Button from '@mui/joy/Button';
import { auth, provider } from '../../config/firebase.config';

const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();  // Obtener el token de ID del usuario autenticado

      // Extraer datos adicionales del usuario
      const { displayName, email, photoURL } = result.user;

      // Enviamos el token y los datos del usuario al backend
      const response = await fetch('http://localhost:3000/create/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Enviamos el token en el encabezado de autorización
        },
        body: JSON.stringify({
          name: displayName,
          email: email,
          imageUrl: photoURL
        })  // Datos del usuario en el cuerpo de la solicitud
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
