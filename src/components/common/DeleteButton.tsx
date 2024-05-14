import { Button } from '@mui/joy';
import colors from '../../colors';

interface DeleteButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
}

/**
 * @brief Button to delete action
 *
 * @param onClick provide clickable property to the button
 * @return Button component to delete an action
 */
const DeleteButton = ({ onClick, children }: DeleteButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant='solid'
      sx={{
        backgroundColor: colors.darkGold,
        '&:hover': {
          backgroundColor: colors.darkerGold,
        },
      }}
    >
      {children || 'Delete'}
    </Button>
  );
};

export default DeleteButton;
