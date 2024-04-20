import Button from '@mui/joy/Button';
import colors from '../../../colors';



function CreateClientButton() {
  return (
    <Button 
      type='submit'
      variant='solid'
      size='sm'
      sx={{
        backgroundColor: colors.darkGold, // Llamar el color correspondiente
        '&:hover': {
          backgroundColor: colors.darkerGold,
        },
      }}
    >
      Create Client
    </Button>
  );
}

export default CreateClientButton;
