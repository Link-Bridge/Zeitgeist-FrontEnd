import Button from '@mui/joy/Button';
import colors from '../../colors';

function AddButton() {
  return (
    <Button
      variant="solid"
      size="sm"
      sx={{
        backgroundColor: colors.darkerBlue, 
        '&:hover': {
          backgroundColor: colors.darkerGold,
        }
      }}
    >
      + New
    </Button>
  );
}

export default AddButton;
