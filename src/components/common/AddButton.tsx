import Button from '@mui/joy/Button';
import colors from '../../colors';

interface AddButtonProps {
  children?: React.ReactNode;
}

const AddButton: React.FC<AddButtonProps> = ({ children }) => {
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
      {children}+ New
    </Button>
  );
};

export default AddButton;
