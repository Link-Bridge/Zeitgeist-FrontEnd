import { Dispatch, SetStateAction, useContext } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';

type ModalConfirmationProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalConfirmation = ({ setOpen }: ModalConfirmationProps) => {
  const { setState } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleConfirmation = () => {
    navigate('/expenses/');
  };

  return (
    <Modal
      open={true}
      onClose={() => {}}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <Sheet
        variant='outlined'
        sx={{
          borderRadius: 'md',
          p: 4,
          boxShadow: 'lg',
          width: '500px',
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
          Reimbursement Request
        </Typography>
        <Typography component='h2' id='modal-desc' textColor='text.tertiary' sx={{ py: 2 }}>
          Are you sure you want to send the reimbursement request?
        </Typography>
        <Alert size='lg' startDecorator={<InfoIcon />} variant='soft' color='primary'>
          This information cannot be modified once it is sent.
        </Alert>
        <Box
          mt={3}
          display='flex'
          alignItems='center'
          justifyContent='end'
          gap={2}
          onSubmit={() => {}}
        >
          <Button
            onClick={() => setOpen(prevState => !prevState)}
            variant='outlined'
            size='lg'
            sx={{
              color: colors.darkGold,
              borderColor: colors.darkGold,
              '&:hover': {
                backgroundColor: colors.lightGold,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            size='lg'
            sx={{
              backgroundColor: colors.darkGold,
              '&:hover': {
                backgroundColor: colors.darkerGold,
              },
            }}
            onClick={handleConfirmation}
          >
            Send Request
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalConfirmation;
