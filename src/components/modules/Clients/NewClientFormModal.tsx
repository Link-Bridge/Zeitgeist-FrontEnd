import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import useHttp from '../../../hooks/useHttp';
import { ResponsePOST } from '../../../types/response.post';
import { RequestMethods } from '../../../utils/constants';
import CancelButton from '../../common/CancelButton';
import CreateClientButton from './CreateClientButton';
import { SnackbarContext } from '../../../hooks/snackbarContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: '2px solid #9C844C',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

interface NewClientFormModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface NewClientRes {
  id: string;
}

const NewClientFormModal = ({ open, setOpen}: NewClientFormModalProps) => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyRFC, setCompanyRFC] = useState('');
  const [companyConstitution, setCompanyConstitution] = useState('');
  const [companyTaxResidence, setCompanyTaxResidence] = useState('');

  const { setState } = useContext(SnackbarContext)

  const { data, error, loading, sendRequest } = useHttp<ResponsePOST<NewClientRes>>(
    '/company/new',
    RequestMethods.POST
  );

  const validateForm = () => {
    return !!companyName && !!companyEmail && !!companyPhone && !!companyRFC && !!companyConstitution && !!companyTaxResidence;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if(!validateForm){
      alert('Please fill all the information');
    } else{
      setState({ open: true, message: 'A message', type: 'success' })
      setOpen(false)
      window.location.reload();
    }
    
    const body = {
      company: {
        name: companyName,
        email: companyEmail,
        phone: companyPhone,
        rfc: companyRFC,
        constitution: companyConstitution,
        taxResidence: companyTaxResidence,
      },
    };

    sendRequest({}, body, { 'Content-Type': 'application/json' });
  };


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      BackdropProps={{ onClick: () => {} }}
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ marginLeft: '10px' }}>
          Create Client
        </Typography>

        <Typography id='modal-modal-description' sx={{ mt: 1, mb: -1, marginLeft: '10px' }}>
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
          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
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
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
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

            <TextField
              required
              id='clientRFC'
              label='RFC'
              variant='outlined'
              value={companyRFC}
              onChange={event => {
                const inputValue = event.target.value;
                if (inputValue.length <= 12) {
                  setCompanyRFC(event.target.value);
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
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

            <TextField
              required
              id='clientTaxResidence'
              label='Tax residence'
              variant='outlined'
              value={companyTaxResidence}
              onChange={event => {
                setCompanyTaxResidence(event.target.value);
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, mb: -2.5, mr: 1, gap: 2.5 }}>
            <CancelButton onClick={() => setOpen(false)} />
            <CreateClientButton/>  
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewClientFormModal;
