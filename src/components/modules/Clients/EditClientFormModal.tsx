import { Box, Modal, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity, UpdateCompanyData } from '../../../types/company';
import { RequestMethods } from '../../../utils/constants';
import CancelButton from '../../common/CancelButton';
import EditClientButton from './EditClientButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: colors.darkGold,
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
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
  const [companyName, setCompanyName] = useState(clientData.name);
  const [companyEmail, setCompanyEmail] = useState(clientData.email);
  const [companyPhone, setCompanyPhone] = useState(clientData.phoneNumber);
  const [companyRFC, setCompanyRFC] = useState(clientData.rfc);
  const [companyConstitution, setCompanyConstitution] = useState(clientData.constitutionDate);
  const [companyTaxResidence, setCompanyTaxResidence] = useState(clientData.taxResidence);

  const { setState } = useContext(SnackbarContext);
  const { sendRequest, data, error, loading } = useHttp<UpdateCompanyData>(
    `/company/${clientData.id}`,
    RequestMethods.PUT
  );

  useEffect(() => {
    if (error) {
      setState({ open: true, message: error.message });
    }
    if (data) {
      setState({ open: true, message: 'Client updated successfully.', type: 'success' });
      if (open) {
        setOpen(false);
        setRefetch(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleUpdate = async () => {
    if (
      !companyName ||
      !companyEmail ||
      !companyPhone ||
      !companyRFC ||
      !companyConstitution ||
      !companyTaxResidence
    ) {
      setState({ open: true, message: 'All fields are required.', type: 'danger' });
      return;
    }

    if (companyPhone.length < 8) {
      setState({
        open: true,
        message: 'Phone number must have at least 8 characters.',
        type: 'danger',
      });
      return;
    } else if (companyPhone.length > 15) {
      setState({
        open: true,
        message: 'Phone number must have at most 15 characters.',
        type: 'danger',
      });
      return;
    }

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
              label='Client Name'
              variant='outlined'
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              sx={{ width: '100ch' }}
            />

            <TextField
              label='Email'
              type='email'
              variant='outlined'
              value={companyEmail}
              onChange={e => setCompanyEmail(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              label='Phone Number'
              type='tel'
              variant='outlined'
              value={companyPhone}
              onChange={e => {
                const input = e.target.value.replace(/\D/g, '');
                setCompanyPhone(input);
              }}
            />

            <TextField
              label='RFC'
              variant='outlined'
              value={companyRFC}
              onChange={e => {
                const inputValue = e.target.value;
                if (inputValue.length <= 13) {
                  setCompanyRFC(e.target.value);
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <DatePicker
              label='Constitution Date'
              value={dayjs(companyConstitution)}
              onChange={e => {
                setCompanyConstitution(e?.toDate() ?? companyConstitution);
              }}
            />

            <TextField
              label='Tax Residence'
              variant='outlined'
              value={companyTaxResidence}
              onChange={e => setCompanyTaxResidence(e.target.value)}
              inputProps={{ maxLength: 13 }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, mb: -2.5, mr: 1, gap: 2.5 }}>
            <CancelButton onClick={() => setOpen(false)} />
            <EditClientButton loading={loading} onClick={handleUpdate} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditClientFormModal;
