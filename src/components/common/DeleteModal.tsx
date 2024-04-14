import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import Colors from '../../colors';

interface ModalInterface {
  open: boolean;
  setOpen: any;
  title: string;
  description: string;
  ToggleModal: any;
}

export default function DeleteModal({
  open,
  setOpen,
  title,
  description,
  ToggleModal,
}: ModalInterface) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
    }
  }, [snackbarOpen]);

  return (
    <>
      <Modal
        size='lg'
        aria-labelledby='modal-title'
        aria-describedby='modal-desc'
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
          <Alert
            size='lg'
            sx={{ mt: 2, pr: 15, border: '#333333' }}
            startDecorator={<WarningIcon />}
            variant='soft'
            color='warning'
          >
            This action cannot be undone.
          </Alert>
          <Box mt={3} display='flex' alignItems='center' justifyContent='end' gap={2} sx={{}}>
            <Button
              onClick={ToggleModal}
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
              onClick={() => {
                setOpen(false);
                setSnackbarOpen(true);
              }}
              size='lg'
              sx={{
                backgroundColor: Colors.darkGold,
                '&:hover': {
                  backgroundColor: Colors.darkerGold,
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Sheet>
      </Modal>
      <Snackbar
        autoHideDuration={3000}
        open={snackbarOpen}
        onClose={(reason: any) => {
          if (reason === 'clickaway') {
            return;
          }
          setSnackbarOpen(false);
        }}
      >
        A snackbar with variant.
      </Snackbar>
    </>
  );
}
