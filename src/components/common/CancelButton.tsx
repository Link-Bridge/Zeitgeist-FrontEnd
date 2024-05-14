import { Button } from '@mui/joy';
import colors from '../../colors';

interface CancelButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

/**
 * @brief Button to cancel action
 *
 * @param onClick provide clickable property to the button
 * @return Button component to cancel an action
 */

const CancelButton = ({ onClick, children }: CancelButtonProps) => {
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
      {children || 'Cancel'}
    </Button>
  );
};

export default CancelButton;
