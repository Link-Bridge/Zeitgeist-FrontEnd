import Button from '@mui/joy/Button';
import colors from '../../../colors';

interface EditClientButtonProps {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Button to edit a client
 *
 * @param {EditClientButtonProps} props - Props containing loading state and click handler
 * @returns {JSX.Element} - The button component
 */
function EditClientButton({ loading, onClick, disabled }: EditClientButtonProps) {
  return (
    <Button
      type='button'
      variant='solid'
      disabled={disabled}
      size='sm'
      onClick={onClick}
      sx={{
        height: '36px',
        marginTop: '10px',
        backgroundColor: colors.darkGold,
        '&:hover': {
          backgroundColor: colors.darkerGold,
        },
      }}
    >
      {loading ? 'Editing...' : 'Edit Client'}
    </Button>
  );
}

export default EditClientButton;
