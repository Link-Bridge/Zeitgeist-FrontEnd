import Lottie from 'react-lottie';
import animation from '../../assets/no-data.json';

const ComponentPlaceholder = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <Lottie options={defaultOptions} height='30vh' width='40vh' />
      <p className='text-xl md:text-2xl text-gray-500 font-gotham mt-4'>Content is on the way...</p>
    </div>
  );
};

export default ComponentPlaceholder;
