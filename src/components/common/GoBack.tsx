import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import left_arrow from '../../assets/icons/left_arrow.svg';
import colors from '../../colors';
import { useHistory } from 'react-router-dom';
import { Location } from 'history';

const GoBack = () => {
  const navigate = useNavigate();
  const history = useHistory();

  const [lastPath, setLastPath] = useState<string>('/'); // Ruta por defecto

  const handleClick = () => {
    if (lastPath.includes('edit') || lastPath.includes('create') || lastPath.includes('new')){
      navigate(-1);
    } else {
      navigate(-2);
    }

    useEffect(() => {
      return history.listen((location: Location) => {
        setLastPath(location.pathname);
      })
    },[history]);
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
