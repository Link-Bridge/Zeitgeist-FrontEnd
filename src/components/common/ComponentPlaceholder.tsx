import Lottie from 'react-lottie-player';
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
  height = '20vh',
  width = '25vh',
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <Lottie loop play animationData={animation} style={{ width: width, height: height }} />
      <div className='text-xl md:text-2xl text-gray-500 font-gotham mt-4'>
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default ComponentPlaceholder;
