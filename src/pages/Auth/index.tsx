import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase.config';

const Auth = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Auth;
