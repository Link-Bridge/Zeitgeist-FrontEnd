import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import Colors from '../../colors';

interface ModalInterface {
  open: boolean;
  title: string;
  description: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal?: () => void;
  handleDelete: (id: string) => void;
  alertColor?: string;
}

export default function DeleteModal({
  open,
  setOpen,
  title,
  description,
  id,
  handleDelete,
  alertColor = 'warning', // Default alert color is warning
}: ModalInterface) {
  const handleOnDelete = () => {
    setOpen(false); // This will close the modal or dialog
    handleDelete(id); // This will update the UI
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            borderRadius: 'md',
            p: 4,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant='plain' sx={{ m: 1 }} />
          <Typography
            component='h2'
            id='modal-title'
            level='h3'
            textColor='inherit'
            fontWeight='lg'
            mb={1}
          >
            {title}
          </Typography>
          <Typography id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
            {description}
          </Typography>
          <Alert size='lg' startDecorator={<WarningIcon />} variant='soft' color={alertColor}>
            This action cannot be undone.
          </Alert>
          <Box mt={3} display='flex' alignItems='center' justifyContent='end' gap={2} sx={{}}>
            <Button
              onClick={() => setOpen(false)}
              variant='outlined'
              size='lg'
              sx={{
                color: Colors.darkGold,
                borderColor: Colors.darkGold,
                '&:hover': {
                  backgroundColor: Colors.lightGold,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              size='lg'
              sx={{
                backgroundColor: Colors.darkGold,
                '&:hover': {
                  backgroundColor: Colors.darkerGold,
                },
              }}
              onClick={() => handleOnDelete()}
            >
              Delete
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
