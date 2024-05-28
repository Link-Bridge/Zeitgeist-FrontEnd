import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useState } from 'react';
import Colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import GenericDropdown from '../../common/GenericDropdown';

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  departments: string[];
  onClose: () => void;
}

/**
 * Modal component for sending notification to user
 *
 * @param open: boolean - state of the modal
 * @param onClose: () => void - Function to close the modal
 * @param onSend: (message: string) => void - Function to send notification
 * @returns JSX.Element - React component
 */

const SendNotificationModal = ({ open, setOpen, departments, onClose }: ModalProps) => {
  const { setState } = useContext(SnackbarContext);
  const [message, setMessage] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  //   useEffect(() => {
  //     if (error) {
  //       setState({ open: true, message: error.message });
  //     }
  //     if (data) {
  //       setState({
  //         open: true,
  //         message: 'Notification sent successfully',
  //         type: 'success',
  //       });
  //       onClose();
  //     }
  //   }, [data, error]);

  const handleDropdownChange = (newValue: string) => {
    setDepartment(newValue);
  };

  const handleSend = async () => {
    // await sendRequest({}, { message });
    onSend(message);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ModalDialog variant='outlined' sx={{ borderRadius: 'md', p: 4, boxShadow: 'lg' }}>
        <ModalClose onClick={onClose} sx={{ m: 1 }} />
        <Typography
          component='h2'
          id='modal-title'
          level='h3'
          textColor='inherit'
          fontWeight='lg'
          mb={1}
        >
          Send Notification
        </Typography>
        <Typography id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
          Do you want to notify the other department that its their turn to start working in the
          project?
        </Typography>
        <GenericDropdown
          options={['Department 1', 'Department 2', 'Department 3']}
          value={null}
          onChange={handleDropdownChange}
        ></GenericDropdown>
        <Box mt={3} display='flex' alignItems='center' justifyContent='end' gap={2} sx={{}}>
          <Button
            variant='outlined'
            onClick={() => setOpen(false)}
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
              '&:hover': { backgroundColor: Colors.darkerGold },
            }}
            onClick={() => handleSend}
          >
            Send
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default SendNotificationModal;
