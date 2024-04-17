import { Button } from '@mui/joy';

const CancelButton = () => {
  return (
    <Button
      variant='outlined'
      sx={{
        borderColor: '#9C844C',
        color: '#9C844C',
        textTransform: 'none',
        padding: '7px 30px',
        margin: '10px 10px',
      }}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
