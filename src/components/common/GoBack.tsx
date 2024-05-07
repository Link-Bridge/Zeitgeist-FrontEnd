import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import left_arrow from '../../assets/icons/left_arrow.svg';
import colors from '../../colors';

interface GoBackProps {
  path: string;
}

const GoBack = (props: GoBackProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
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
