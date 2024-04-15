import { Button } from "@mui/material";
import colors from "../../colors";

interface CancelButtonProps {
    onClick: () => void;
}

function CancelButton ({onClick}: CancelButtonProps) {
    return (
      <Button onClick={onClick}
        variant='outlined'
        size='small'
        sx={{
          '&:hover': {
            backgroundColor: colors.darkGold,
            borderColor: colors.darkGold,
            color: "white"
          },
          borderColor: colors.darkGold,
          color: colors.darkGold
        }}
      >
        Cancel
      </Button>
    );
  }

export default CancelButton