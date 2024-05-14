import Link from '@mui/joy/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import left_arrow from '../../assets/icons/left_arrow.svg';
import colors from '../../colors';

const GoBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.state && location.state.fromDetail) return navigate(-2);
    navigate(-1);
  };

  return (
    <>
      <img src={left_arrow} alt='Left arrow' className='w-3.5' />
      <Link
        onClick={handleClick}
        underline='none'
        className='ml-auto'
        sx={{
          color: colors.darkGold,
          '&:hover': {
            color: colors.darkerGold,
          },
        }}
      >
        {' '}
        &nbsp;{'Go Back'}{' '}
      </Link>
    </>
  );
};

export default GoBack;
