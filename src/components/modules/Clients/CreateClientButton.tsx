import Button from '@mui/joy/Button';
import colors from '../../../colors';

interface CreateClientButtonProps {
  loading: boolean;
}

/**
 * @brief Button to create a new client
 *
 * @param loading indicates the loading process
 * @return Button component acording the loading state
 */

function CreateClientButton({ loading }: CreateClientButtonProps) {
  return (
    <Button
      type='submit'
      variant='solid'
      size='sm'
      sx={{
        height: '36px',
        marginTop: '10px',
        backgroundColor: colors.darkGold,
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
