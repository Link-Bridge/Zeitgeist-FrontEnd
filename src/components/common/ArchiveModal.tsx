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
import useArchiveClient from '../../hooks/useArchiveClient';

interface ModalInterface {
  open: boolean;
  title: string;
  description: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal?: () => void;
  handleArchiveClient: (status: string) => void;
}

export default function ArchiveModal({
  open,
  setOpen,
  title,
  description,
  id,
  handleArchiveClient,
}: ModalInterface) {
  const useArchive = useArchiveClient();

  const handleDelete = async () => {
    try {
      await useArchive.archiveClient(id);
      setOpen(false); // This will close the modal or dialog
      handleArchiveClient('success'); // This will update the UI
    } catch (error) {
      console.error(error);
      handleArchiveClient('error'); // This will update the UI
    }
  };

  return (
    <>
      <Modal
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
            This action can be undone.
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
              onClick={() => handleDelete()}
            >
              {title}
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
