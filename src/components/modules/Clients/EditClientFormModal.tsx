import { Box, Grid, Modal, TextField, Typography } from '@mui/material';
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
      setState({ open: true, message: 'The name field is required.', type: 'danger' });
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

    await sendRequest({}, updatedClientData);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Edit Client
        </Typography>
        <form onSubmit={handleUpdate} autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label='Client Name'
                fullWidth
                margin='normal'
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Email'
                type='email'
                fullWidth
                margin='normal'
                value={companyEmail}
                onChange={e => setCompanyEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Phone Number'
                type='tel'
                fullWidth
                margin='normal'
                value={companyPhone}
                onChange={e => setCompanyPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='RFC'
                fullWidth
                margin='normal'
                value={companyRFC}
                onChange={e => setCompanyRFC(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='Constitution Date'
                value={dayjs(companyConstitution)}
                onChange={e => {
                  setCompanyConstitution(e?.toDate() ?? companyConstitution);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Tax Residence'
                fullWidth
                margin='normal'
                value={companyTaxResidence}
                onChange={e => setCompanyTaxResidence(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, mb: -2.5, mr: 1, gap: 2.5 }}>
            <CancelButton onClick={() => setOpen(false)} />
            <EditClientButton loading={loading} onClick={handleUpdate} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditClientFormModal;
