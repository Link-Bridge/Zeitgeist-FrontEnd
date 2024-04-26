import Button from '@mui/joy/Button';
import colors from '../../colors';

interface AddButtonProps {
  onClick: () => void;
}

function AddButton({ onClick }: AddButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant='solid'
      size='sm'
      sx={{
        backgroundColor: colors.darkGold,
        '&:hover': {
          backgroundColor: colors.darkerGold,
        },
      }}
    >
      + New
    </Button>
  );
}

export default AddButton;
