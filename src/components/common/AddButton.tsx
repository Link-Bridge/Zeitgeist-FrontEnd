import Button from '@mui/joy/Button';
import colors from '../../colors';

interface AddButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }: AddButtonProps) => {
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
