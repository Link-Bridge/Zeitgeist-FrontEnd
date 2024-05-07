import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { RequestMethods } from '../../../utils/constants';
import CancelButton from '../../common/CancelButton';
import CreateClientButton from './CreateClientButton';

/**
 * @brief style object for box component
 */
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: '2px solid' && colors.darkGold,
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
  /**
   * @brief using http hook being able to send new client information
   */
  const { data, error, loading, sendRequest } = useHttp<CompanyEntity>(
    '/company/new',
    RequestMethods.POST
  );

  /**
   * @brief Manage error
   */
  const handleError = () => {
    if (error && 'code' in error && error.code == 'ERR_NETWORK')
      return setState({
        open: true,
        message: 'An unexpected error occurred. Please try again',
        type: 'danger',
      });

    if (error && 'response' in error && error.response?.data)
      return setState({ open: true, message: error.response.data?.error, type: 'danger' });
    if (error) return setState({ open: true, message: 'Error', type: 'danger' });
  };

  /**
   * @brief Supervise the're no error, if it's clean, send a succuess message, close the modal
   * and refetch
   */
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

  useEffect(() => {
    handleError();
    handleSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  /**
   * @brief The required information
   */
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

  /**
   * @brief Handle form submission validating form data, preparing
   * request body and send the request to the server
   */
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (companyPhone.length < 8) {
      setState({
        open: true,
        message: 'Phone number must have at least 8 characters',
        type: 'danger',
      });
      return;
    } else if (companyPhone.length > 15) {
      setState({
        open: true,
        message: 'Phone number must have at most 15 characters',
        type: 'danger',
      });
      return;
    }

    if (!validateForm())
      return setState({ open: true, message: 'All fields are required', type: 'danger' });

    // Parse date
    const dateString = companyConstitution;
    const dateParts = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

    const body = {
      company: {
        name: companyName,
        email: companyEmail,
        phoneNumber: companyPhone,
        rfc: companyRFC,
        constitutionDate: date.toUTCString(),
        taxResidence: companyTaxResidence,
      },
    };

    await sendRequest({}, body, { 'Content-Type': 'application/json' });
  };

  /**
   * @brief A modal component with forms for creating a new client
   *
   * A form is used to request required information to create clients,
   * with success and error messages displayed.
   *
   * @param open open the modal
   * @param setOpen modal state
   * @param setRefetch obtain the current clients and show them on screen
   */

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
              id='clientRFC'
              label='RFC'
              variant='outlined'
              value={companyRFC}
              onChange={event => {
                const inputValue = event.target.value;
                if (inputValue.length <= 13) {
                  setCompanyRFC(event.target.value);
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField
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
            <CreateClientButton loading={loading} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewClientFormModal;
