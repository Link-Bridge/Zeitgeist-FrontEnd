import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { RequestMethods } from '../../../utils/constants';
import { dateGreaterThanToday, validRFC } from '../../../utils/methods';
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
  const { setState } = useContext(SnackbarContext);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyRFC, setCompanyRFC] = useState('');
  const [companyConstitution, setCompanyConstitution] = useState('');
  const [companyTaxResidence, setCompanyTaxResidence] = useState('');

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
      return setState({
        open: true,
        message: (error.response.data as { error: string })?.error,
        type: 'danger',
      });
    if (error) return setState({ open: true, message: 'Error', type: 'danger' });
  };

  /**
   * @brief Supervise the're no error, if it's clean, send a success message, close the modal
   * and refetch
   */
  const handleSuccess = () => {
    if (!error && data && data.id) {
      setState({ open: true, message: 'Company created succesfully,', type: 'success' });
      setTimeout(() => {
        setOpen(false);
        setState({ open: false, message: '' });
      }, 2000);
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
  const hasEmptyFields = () => {
    return !companyName;
  };

  const hasErrors = () => {
    return Object.values(errors).some(error => error !== '');
  };

  /**
   * @brief Handle form submission validating form data, preparing
   * request body and send the request to the server
   */
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

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
              label={
                <>
                  Name
                  <span style={{ color: 'red' }}> *</span>
                </>
              }
              variant='outlined'
              value={companyName}
              onChange={event => {
                if (event.target.value.length > 70) {
                  return setState({
                    open: true,
                    message: 'Name cannot be longer than 70 characters.',
                    type: 'danger',
                  });
                } else if (!event.target.value || event.target.value.length == 0) {
                  setErrors({ ...errors, name: 'Name is required.' });
                  setState({
                    open: true,
                    message: 'Name is required.',
                    type: 'danger',
                  });
                } else {
                  setErrors({ ...errors, name: '' });
                  setState({ open: false, message: '' });
                }
                setCompanyName(event.target.value);
              }}
              sx={{
                width: '100ch',
                borderRadius: '4px',
                border: `1px solid ${errors['name'] ? colors.danger : colors.lighterGray}`,
              }}
            />

            <TextField
              id='clientEmail'
              label='Email'
              type='email'
              variant='outlined'
              value={companyEmail}
              onChange={event => {
                if (event.target.value.length > 70) {
                  return setState({
                    open: true,
                    message: 'Email cannot be longer than 70 characters.',
                    type: 'danger',
                  });
                } else {
                  setState({ open: false, message: '' });
                }
                setCompanyEmail(event.target.value);
              }}
              onBlur={event => {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                const email = event.target.value;
                if (email && !emailRegex.test(event.target.value)) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'Please enter a valid email address.',
                  }));
                  setState({
                    open: true,
                    message: 'Please enter a valid email address.',
                    type: 'danger',
                  });
                } else {
                  setErrors(prevErrors => ({ ...prevErrors, email: '' }));
                  setState({ open: false, message: '' });
                }
              }}
              sx={{
                borderRadius: '4px',
                border: `1px solid ${errors['email'] ? colors.danger : colors.lighterGray}`,
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
                if (!/^\d*\.?\d*$/.test(event.target.value)) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    phoneNumber: 'Only numbers are allowed.',
                  }));
                  setState({
                    open: true,
                    message: 'Phone number can only be numbers.',
                    type: 'danger',
                  });
                  return;
                }
                if (event.target.value.length > 13) {
                  return setState({
                    open: true,
                    message: 'Phone number cannot be longer than 13 characters.',
                    type: 'danger',
                  });
                } else {
                  setErrors(prevErrors => ({ ...prevErrors, phoneNumber: '' }));
                  setState({ open: false, message: '' });
                }
                setCompanyPhone(event.target.value);
              }}
              onBlur={event => {
                if (
                  event.target.value &&
                  event.target.value.length < 8 &&
                  event.target.value.length > 0
                ) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    phoneNumber: 'Phone number must be at least 10 characters.',
                  }));
                  setState({
                    open: true,
                    message: 'Phone number must be at least 10 characters.',
                    type: 'danger',
                  });
                } else {
                  setErrors(prevErrors => ({ ...prevErrors, phoneNumber: '' }));
                  setState({ open: false, message: '' });
                }
              }}
              sx={{
                borderRadius: '4px',
                border: `1px solid ${errors['phoneNumber'] ? colors.danger : colors.lighterGray}`,
              }}
            />

            <TextField
              id='clientRFC'
              label='RFC'
              variant='outlined'
              value={companyRFC}
              onChange={event => {
                const inputValue = event.target.value;
                if (inputValue.length > 13) {
                  return setState({
                    open: true,
                    message: 'RFC cannot be longer than 13 characters.',
                    type: 'danger',
                  });
                } else {
                  setState({ open: false, message: '' });
                }
                setCompanyRFC(inputValue.toUpperCase());
              }}
              onBlur={event => {
                if (event.target.value && !validRFC(event.target.value)) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    rfc: 'Please enter a valid RFC.',
                  }));
                  setState({
                    open: true,
                    message: 'Please enter a valid RFC.',
                    type: 'danger',
                  });
                } else {
                  setErrors(prevErrors => ({ ...prevErrors, rfc: '' }));
                  setState({ open: false, message: '' });
                }
              }}
              sx={{
                borderRadius: '4px',
                border: `1px solid ${errors['rfc'] ? colors.danger : colors.lighterGray}`,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexdirection: 'row' }}>
            <TextField
              id='clientConstituton'
              label='Constitution date'
              type='Date'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              value={companyConstitution}
              onChange={event => {
                const value = event.target.value;

                const date = new Date(value);
                const isValidDate = date instanceof Date && !isNaN(date.getTime());
                if (!isValidDate && date) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    constitutionDate: 'Please enter a valid date.',
                  }));
                  setState({
                    open: true,
                    message: 'Please enter a valid date.',
                    type: 'danger',
                  });
                } else if (
                  dateGreaterThanToday(date) ||
                  dateGreaterThanToday(dayjs(date).add(1, 'day').toDate())
                ) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    constitutionDate: 'Constitution date cannot be greater than today.',
                  }));
                  setState({
                    open: true,
                    message: 'Constitution date cannot be greater than today.',
                    type: 'danger',
                  });
                } else {
                  setErrors(prevErrors => ({ ...prevErrors, constitutionDate: '' }));
                  setState({ open: false, message: '' });
                }

                setCompanyConstitution(event.target.value);
              }}
            />

            <TextField
              id='clientTaxResidence'
              label='Tax residence'
              variant='outlined'
              value={companyTaxResidence}
              onChange={event => {
                if (event.target.value.length > 150) {
                  return setState({
                    open: true,
                    message: 'Tax residence cannot be longer than 150 characters.',
                    type: 'danger',
                  });
                } else {
                  setState({ open: false, message: '' });
                }
                setCompanyTaxResidence(event.target.value);
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, mb: -2.5, mr: 1, gap: 2.5 }}>
            <CancelButton onClick={() => setOpen(false)} />
            <CreateClientButton loading={loading} disabled={hasEmptyFields() || hasErrors()} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewClientFormModal;
