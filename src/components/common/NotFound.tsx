import Lottie from 'react-lottie-player';
import NotFoundAnimation from '../../assets/not-found.json';

const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
      <Lottie options={defaultOptions} height={800} width={800} />
    </div>
  );
};

export default NotFoundPage;
