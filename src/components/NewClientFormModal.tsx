import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CancelButton from './common/CancelButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface NewClientFormModalProps {
  open: boolean;
  onClose: () => void;
}

const NewClientFormModal = ({ open, onClose }: NewClientFormModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      BackdropProps={{ onClick: () => {} }}
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Create Client
        </Typography>

        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Add a client to the platform
        </Typography>

        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          noValidate
          autoComplete='off'
        >
          <div className='centered-input'>
            <TextField required id='clientName' label='Clients name' variant='outlined' />
          </div>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField required id='clientEmail' label='Email' type='email'
             variant='outlined' />
            <TextField required id='clientPhone' label='Phone number' variant='outlined' />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField required id='clientRFC' label='RFC' variant='outlined' />
            <TextField required id='clientConstituton' label='Constitucion' variant='outlined' />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField required id='clientSocialDomain' label='Social Domain' variant='outlined' />
            <TextField required id='clientFiscalDomain' label='Fiscal Domain' variant='outlined' />
          </Box>
        </Box>

        <Box sx={{display: 'flex', justifyContent:'center', mt:2, gap:2.5}}>
        <CancelButton onClick={onClose}/>
        <Button type='submit'>Enviar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewClientFormModal;
