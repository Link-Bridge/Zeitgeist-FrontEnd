import Lottie from 'react-lottie';
import animation from '../../assets/data-not-found.json';

/**
 * A placeholder component displaying a Lottie animation and a custom message.
 *
 * @param {Object} props The props passed to the component.
 * @param {string} props.text The text to display below the animation.
 * @param {string} props.height The height of the Lottie animation.
 * @param {string} props.width The width of the Lottie animation.
 * @returns {JSX.Element} The rendered component with animation and text.
 */
const ComponentPlaceholder = ({
  text = 'Content is on the way...',
  height = '25vh',
  width = '35vh',
}) => {
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
      <Lottie options={defaultOptions} height={height} width={width} />
      <p className='text-xl md:text-2xl text-gray-500 font-gotham mt-4'>
        <h2>{text}</h2>
      </p>
    </div>
  );
};

export default ComponentPlaceholder;
