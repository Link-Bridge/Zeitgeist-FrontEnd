import { FormControl, FormHelperText } from '@mui/joy';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity, UpdateCompanyData } from '../../../types/company';
import { RequestMethods } from '../../../utils/constants';
import { dateGreaterThanToday, validRFC } from '../../../utils/methods';
import CancelButton from '../../common/CancelButton';
import EditClientButton from './EditClientButton';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid' && colors.darkGold,
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  minWidth: '448px',
  maxWidth: '50vw',
};

interface EditClientFormModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRefetch: (refetch: boolean) => void;
  clientData: CompanyEntity;
}

const EditClientFormModal = ({
  open,
  setOpen,
  setRefetch,
  clientData,
}: EditClientFormModalProps) => {
  const { setState } = useContext(SnackbarContext);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [companyName, setCompanyName] = useState(clientData.name);
  const [companyEmail, setCompanyEmail] = useState(clientData.email);
  const [companyPhone, setCompanyPhone] = useState(clientData.phoneNumber);
  const [companyRFC, setCompanyRFC] = useState(clientData.rfc);
  const [companyConstitution, setCompanyConstitution] = useState(
    clientData.constitutionDate || null
  );
  const [companyTaxResidence, setCompanyTaxResidence] = useState(clientData.taxResidence);

  const { sendRequest, data, error, loading } = useHttp<UpdateCompanyData>(
    `/company/${clientData.id}`,
    RequestMethods.PUT
  );

  useEffect(() => {
    updatePerviewClientInfo();

    if (error) {
      setState({ open: true, message: error.message });
    }
    if (data) {
      setState({ open: true, message: 'Client updated successfully.', type: 'success' });
      if (open) {
        setOpen(false);
        setRefetch((prev: boolean) => !prev);
      }
      //TODO: Checar si la snackbar se setea a su estado neutral
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, clientData]);

  /**
   * @brief The required information
   */
  const hasEmptyFields = () => {
    return !companyName;
  };

  const hasInvalidDate = () => {
    if (companyConstitution) {
      const date = new Date(companyConstitution);
      if (!date.getDate() || !date.getMonth() || !date.getFullYear()) {
        return true;
      }
    } else {
      return false;
    }
  };

  const hasErrors = () => {
    return Object.values(errors).some(error => error !== '');
  };

  /**
   * @brief Reset the form and close the modal
   */
  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setState({ open: false, message: '' });
  };

  /**
   * @brief Reset the form and close the modal
   */
  const handleCancel = () => {
    updatePerviewClientInfo();
    handleClose();
  };

  const handleUpdate = async () => {
    const updatedClientData = {
      id: clientData.id,
      name: companyName,
      email: companyEmail,
      phoneNumber: companyPhone,
      rfc: companyRFC,
      constitutionDate: companyConstitution,
      taxResidence: companyTaxResidence,
    };

    await sendRequest({ method: RequestMethods.PUT }, updatedClientData);
  };

  const updatePerviewClientInfo = () => {
    setCompanyName(clientData.name);
    setCompanyEmail(clientData.email);
    setCompanyPhone(clientData.phoneNumber);
    setCompanyRFC(clientData.rfc);
    setCompanyConstitution(clientData.constitutionDate || null);
    setCompanyTaxResidence(clientData.taxResidence);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ marginLeft: '10px' }}>
          Modify Client
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 1, mb: -1, marginLeft: '10px' }}>
          Modify client details
        </Typography>

        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
            pt: 2,
            pb: 2,
          }}
          autoComplete='off'
          onSubmit={handleUpdate}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              error={errors['name'] ? true : false}
              helperText={errors['name']}
              label={
                <>
                  Name
                  <span style={{ color: 'red' }}> *</span>
                </>
              }
              variant='outlined'
              value={companyName}
              onChange={e => {
                if (e.target.value.length > 70) {
                  return setState({
                    open: true,
                    message: 'Name cannot be longer than 70 characters.',
                    type: 'danger',
                  });
                } else if (!e.target.value || e.target.value.length == 0) {
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
                setCompanyName(e.target.value);
              }}
              sx={{
                width: '100ch',
                borderRadius: '4px',
              }}
            />

            <TextField
              error={errors['email'] ? true : false}
              helperText={errors['email']}
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
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              error={errors['phoneNumber'] ? true : false}
              helperText={errors['phoneNumber']}
              label='Phone Number'
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
              }}
            />

            <TextField
              error={errors['rfc'] ? true : false}
              helperText={errors['rfc']}
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
                const inputRFC = event.target.value;
                if (inputRFC && !validRFC(event.target.value)) {
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
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl>
              <DatePicker
                disableFuture
                label='Constitution Date'
                value={companyConstitution ? dayjs(companyConstitution) : null}
                onChange={newValue => {
                  if (!newValue) {
                    setCompanyConstitution(null);
                    setErrors(prevErrors => ({ ...prevErrors, constitutionDate: '' }));
                    setState({ open: false, message: '' });
                  } else {
                    const date = newValue.toDate();
                    const isValidDate = date instanceof Date && !isNaN(date.getTime());

                    if (!isValidDate) {
                      setState({
                        open: true,
                        message: 'Please enter a valid date.',
                        type: 'danger',
                      });
                      setErrors(prevErrors => ({
                        ...prevErrors,
                        constitutionDate: 'Please enter a valid date.',
                      }));
                    } else if (dateGreaterThanToday(date)) {
                      setState({
                        open: true,
                        message: 'Constitution date cannot be greater than today.',
                        type: 'danger',
                      });
                      setErrors(prevErrors => ({
                        ...prevErrors,
                        constitutionDate: 'Constitution date cannot be greater than today.',
                      }));
                    } else {
                      setCompanyConstitution(date);
                      setErrors(prevErrors => ({ ...prevErrors, constitutionDate: '' }));
                      setState({ open: false, message: '' });
                    }
                  }
                }}
                sx={{ borderColor: errors['constitutionDate'] ? colors.danger : undefined }}
              />
              {errors['constitutionDate'] !== '' && (
                <FormHelperText sx={{ color: colors.danger }}>
                  {errors['constitutionDate']}
                </FormHelperText>
              )}
            </FormControl>

            <TextField
              label='Tax Residence'
              variant='outlined'
              value={companyTaxResidence}
              onChange={e => {
                if (e.target.value.length > 150) {
                  return setState({
                    open: true,
                    message: 'Tax residence cannot be longer than 150 characters.',
                    type: 'danger',
                  });
                } else {
                  setState({ open: false, message: '' });
                }
                setCompanyTaxResidence(e.target.value);
              }}
              inputProps={{ maxLength: 255 }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, mb: -2.5, mr: 1, gap: 2.5 }}>
            <CancelButton onClick={handleCancel} />
            <EditClientButton
              loading={loading}
              onClick={handleUpdate}
              disabled={hasEmptyFields() || hasErrors() || hasInvalidDate()}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditClientFormModal;
