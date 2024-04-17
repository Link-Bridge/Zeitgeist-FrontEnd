import Button from '@mui/material/Button';

const SendButton = () => {
  return (
    <Button
      variant='contained'
      sx={{
        bgcolor: '#9C844C',
        color: '#fff',
        textTransform: 'none',
        padding: '6px 30px',
        margin: '10px 0',
        '&:hover': {
          bgcolor: '#876F39',
          opacity: '0.8',
        },
      }}
    >
      Add Task
    </Button>
  );
};

export default SendButton;
