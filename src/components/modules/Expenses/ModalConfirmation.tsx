import { useContext } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import colors from '../../../colors';
import { ExpenseContext } from '../../../hooks/expenseContext';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import { axiosInstance } from '../../../lib/axios/axios';
import { ExpenseReportStatus } from '../../../types/expense';
import { APIPath, BASE_API_URL } from '../../../utils/constants';

/**
 * Handles the confirmation of the expense report.
 * Sends a POST request to create the expense report.
 */
const ModalConfirmation = () => {
  const { state, dispatch } = useContext(ExpenseContext);
  const { setState } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const baseUrl = `${BASE_API_URL}${APIPath.EXPENSES}`;

  const handleConfirmation = async () => {
    try {
      const payload = { ...state.reimbursementRequest };
      payload.status = ExpenseReportStatus.PENDING;
      const config: AxiosRequestConfig = {
        url: `${baseUrl}/create`,
        method: 'POST',
        data: payload,
      };
      const res = await axiosInstance(config);
      setState({
        open: true,
        message: 'Expense Report created successfully',
        type: 'success',
      });
      navigate('/expenses/');
      dispatch({ type: 'restart-request' });
      return res.data;
      // dispatch({ type: 'send-request', payload: { report: state.reimbursementRequest } });
    } catch (e: unknown) {
      setState({
        open: true,
        message: 'Error creating Expense Report',
        type: 'danger',
      });
    }
  };

  /**
   * Modal Confirmation component
   *
   * @component
   *
   * @returns {JSX.Element} Modal confirmation component
   */

  return (
    <Modal
      open={state.modalOpen}
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
        <ModalClose
          onClick={() => dispatch({ type: 'toggle-modal' })}
          variant='plain'
          sx={{ m: 1 }}
        />
        <Typography
          component='h2'
          id='modal-title'
          level='h3'
          textColor='inherit'
          fontWeight='lg'
          mb={1}
        >
          Send reimbursement request
        </Typography>
        <Typography component='h2' id='modal-desc' textColor='text.tertiary' sx={{ py: 2 }}>
          Double-check that all the information is correct.
        </Typography>
        <Alert size='lg' startDecorator={<InfoIcon />} variant='soft' color='primary'>
          This information cannot be modified once it is sent.
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
            onClick={() => dispatch({ type: 'toggle-modal' })}
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
            onClick={handleConfirmation}
          >
            Send
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalConfirmation;
