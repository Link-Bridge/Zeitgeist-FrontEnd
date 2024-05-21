import Lottie from 'react-lottie-player';
import NotFoundAnimation from '../../assets/not-found.json';

const NotFoundPage = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Lottie animationData={NotFoundAnimation} play loop style={{ width: 800, height: 800 }} />
    </div>
  );
};

export default NotFoundPage;
