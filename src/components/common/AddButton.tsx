import Button from '@mui/joy/Button';
import colors from '../../colors'; // Importar los colores del archivo colors.tsx

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
};

export default AddButton;
