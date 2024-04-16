import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
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
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyRFC, setCompanyRFC] = useState('');
  const [companyConstitution, setCompanyConstitution] = useState('');
  const [companyFiscalDomain, setCompanyFiscalDomain] = useState('');
  const [companySocialDomain, setCompanySocialDomain] = useState('');
  

  const handleSubmit = event => {
    event.preventDefault();
    const validData = true;
    if(validData){
      
    }
    const data = {
      name: companyName,
      email: companyEmail,
      phone: companyPhone,
      rfc: companyRFC,
      constitution: companyConstitution,
      socialDomain: companySocialDomain,
      fiscalDomain: companyFiscalDomain
    };

    console.log('sending data', data);
  };

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
            pt: 2,
            pb: 2,
          }}
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id='clientName'
            label='Clients name'
            variant='outlined'
            value={companyName}
            onChange={event => {
              setCompanyName(event.target.value);
            }}
            sx={{ width: '100ch' }}
          />
          
          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField
              required
              id='clientEmail'
              label='Email'
              type='email'
              variant='outlined'
              value={companyEmail}
              onChange={event => {
                setCompanyEmail(event.target.value);
              }}
            />
            <TextField
              required
              id='clientPhone'
              label='Phone number'
              type='tel'
              variant='outlined'
              value={companyPhone}
              onChange={event => {
                const input = event.target.value.replace(/\D/g, '');
                setCompanyPhone(input);
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField
              required
              id='clientRFC'
              label='RFC'
              variant='outlined'
              value={companyRFC}
              onChange={event => {
                setCompanyRFC(event.target.value);
              }}
            />
            <TextField
              required
              id='clientConstituton'
              label='Constitucion date'
              type='Date'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              value={companyConstitution}
              onChange={event => {
                setCompanyConstitution(event.target.value);
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField
              required
              id='clientSocialDomain'
              label='Social Domain'
              variant='outlined'
              value={companySocialDomain}
              onChange={event => {
                setCompanySocialDomain(event.target.value);
              }}
            />
            <TextField
              required
              id='clientFiscalDomain'
              label='Fiscal Domain'
              variant='outlined'
              value={companyFiscalDomain}
              onChange={event => {
                setCompanyFiscalDomain(event.target.value);
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2.5 }}>
            <CancelButton onClick={onClose} />
            <Button type='submit'>Enviar</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewClientFormModal;
