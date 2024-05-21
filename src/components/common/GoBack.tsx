import { ArrowBackIosNewRounded } from '@mui/icons-material';
import Link from '@mui/joy/Link';
import { useLocation, useNavigate } from 'react-router-dom';
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
        <ArrowBackIosNewRounded sx={{ color: colors.darkGold }} /> &nbsp;{'Go Back'}{' '}
      </Link>
    </>
  );
};

export default GoBack;
