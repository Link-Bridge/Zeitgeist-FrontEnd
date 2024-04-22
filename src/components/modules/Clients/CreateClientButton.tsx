import Button from '@mui/joy/Button';
import colors from '../../../colors';

interface CreateClientButtonProps {
  loading: boolean;
}

function CreateClientButton({ loading }: CreateClientButtonProps) {
  return (
    <Button
      type='submit'
      variant='solid'
      size='sm'
      sx={{
        height: '36px',
        marginTop: '10px',
        backgroundColor: colors.darkGold, // Llamar el color correspondiente
        '&:hover': {
          backgroundColor: colors.darkerGold,
        },
      }}
    >
      {loading && 'Creating...'}
      {!loading && 'Create Client'}
    </Button>
  );
}

export default CreateClientButton;
