import { Button } from '@mui/joy';
import colors from '../../colors';

interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant='outlined'
      sx={{
        borderColor: '#9C844C',
        color: '#9C844C',
        textTransform: 'none',
        padding: '7px 30px',
        margin: '10px 0',
        '&:hover': {
          backgroundColor: colors.darkGold,
          borderColor: colors.darkGold,
          color: 'white',
        },
      }}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
