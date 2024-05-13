import { Button } from '@mui/joy';
import colors from '../../colors';

interface ModifyButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Generic Modify button component
 *
 * @component
 *
 * @param props: Object - The component props
 * @returns
 */
const ModifyButton = ({ onClick, disabled }: ModifyButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        bgcolor: colors.darkGold,
        color: '#fff',
        textTransform: 'none',
        padding: '6px 30px',
        margin: '10px 0',
        '&:hover': {
          bgcolor: colors.darkerGold,
          opacity: '0.8',
        },
      }}
    >
      Modify Task
    </Button>
  );
};

export default ModifyButton;
