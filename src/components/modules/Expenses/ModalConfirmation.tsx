import { useContext } from 'react';

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

type ModalEditProps = {};

const ModalConfirmation = ({}: ModalEditProps) => {
  const { setState } = useContext(SnackbarContext);
  const navigate = useNavigate();

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
          Archive Project
        </Typography>
        <Typography component='h2' id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
          Are sure you want to archive this project?
        </Typography>
        <Alert size='lg' startDecorator={<InfoIcon />} variant='soft' color='primary'>
          Don't worry, this action can be undone.
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
            onClick={() => {}}
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
            onClick={() => {}}
          >
            Archive
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalConfirmation;
