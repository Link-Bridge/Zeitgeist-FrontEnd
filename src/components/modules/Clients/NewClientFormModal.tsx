import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { RequestMethods } from '../../../utils/constants';
import CancelButton from '../../common/CancelButton';
import CreateClientButton from './CreateClientButton';

const style = {
  position: 'absolute' as const,
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewClientFormModal = ({ open, setOpen, setRefetch }: NewClientFormModalProps) => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyRFC, setCompanyRFC] = useState('');
  const [companyConstitution, setCompanyConstitution] = useState('');
  const [companyTaxResidence, setCompanyTaxResidence] = useState('');

  const { setState } = useContext(SnackbarContext);

  const { data, error, sendRequest } = useHttp<CompanyEntity>('/company/new', RequestMethods.POST);

  useEffect(() => {
    handleError();
    handleSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const validateForm = () => {
    return (
      companyName != '' &&
      companyEmail != '' &&
      companyPhone != '' &&
      companyRFC != '' &&
      companyConstitution != '' &&
      companyTaxResidence != ''
    );
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!validateForm())
      return setState({ open: true, message: 'All fields are required', type: 'danger' });

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

  const handleError = () => {
    if (error) setState({ open: true, message: error.response.data.error, type: 'danger' });
    console.log(error)
  };

  const handleSuccess = () => {
    if (!error && data && data.id) {
      setState({ open: true, message: 'Company created', type: 'success' });
      setOpen(false);

      setCompanyName('');
      setCompanyEmail('');
      setCompanyPhone('');
      setCompanyRFC('');
      setCompanyConstitution('');
      setCompanyTaxResidence('');

      setRefetch(true);
    }
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
              // required
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
              // required
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
              // required
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
              // required
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
              // required
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
              // required
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
            <CreateClientButton />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewClientFormModal;
