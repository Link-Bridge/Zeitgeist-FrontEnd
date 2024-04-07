import Button from '@mui/joy/Button';
import colors from '../../colors'; // Importar los colores del archivo colors.tsx

function AddButton() {
  return (
    <Button
      variant="solid"
      size="sm"
      sx={{
        backgroundColor: colors.darkGold, // Llamar el color correspondiente
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
