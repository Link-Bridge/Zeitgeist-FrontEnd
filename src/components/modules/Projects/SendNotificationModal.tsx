import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useEffect, useMemo, useState } from 'react';
import Colors from '../../../colors';
import { EmployeeContext } from '../../../hooks/employeeContext';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { SupportedDepartments } from '../../../types/department';
import { RequestMethods, RoutesPath } from '../../../utils/constants';
import GenericDropdown from '../../common/GenericDropdown';

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  onClose: () => void;
}

/**
 * Modal component for sending notification to user
 *
 * @param open: boolean - state of the modal
 * @param onClose: () => void - Function to close the modal
 * @param onSend: (message: string) => void - Function to send notification
 * @returns JSX.Element - React component
 */

const SendNotificationModal = ({ open, projectId, onClose }: ModalProps) => {
  const { setState } = useContext(SnackbarContext);
  const { employee } = useContext(EmployeeContext);
  const [department, setDepartment] = useState<string>('');
  const { data, loading, sendRequest, error } = useHttp<string>(
    `${RoutesPath.NOTIFICATIONS}/send/deparment`,
    RequestMethods.POST
  );

  const departmentOptions = useMemo(() => {
    if (!employee) return [];

    switch (employee.department) {
      case SupportedDepartments.ACCOUNTING:
        return [SupportedDepartments.LEGAL];
      case SupportedDepartments.LEGAL:
        return [SupportedDepartments.ACCOUNTING];
      case SupportedDepartments.WITHOUT_DEPARTMENT:
        return [SupportedDepartments.ACCOUNTING, SupportedDepartments.LEGAL];
      default:
        return [];
    }
  }, [employee]);

  const handleDropdownChange = (newValue: string) => {
    setDepartment(newValue);
  };

  const handleSend = async () => {
    await sendRequest({}, { departmentTitle: department, projectId: projectId });
  };

  useEffect(() => {
    if (error) {
      setState({ open: true, message: `Error sending notification: ${error}`, type: 'danger' });
    } else if (data) {
      setState({ open: true, message: 'Notification sent successfully', type: 'success' });
    }
  }, [error, data, setState]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ModalDialog variant='outlined' sx={{ borderRadius: 'md', p: 4, boxShadow: 'lg' }}>
        <ModalClose onClick={onClose} sx={{ m: 1 }} />
        <Typography
          component='h2'
          id='modal-title'
          level='h3'
          textColor='inherit'
          fontWeight='lg'
          mb={1}
        >
          Send Notification
        </Typography>
        <Typography id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
          Do you want to notify the other department that it is their turn to start working on the
          project?
        </Typography>
        <GenericDropdown
          placeholder='Select department'
          options={departmentOptions}
          value={department}
          onChange={event => handleDropdownChange(event!)}
        ></GenericDropdown>
        <Box mt={3} display='flex' alignItems='center' justifyContent='end' gap={2} sx={{}}>
          <Button
            variant='outlined'
            size='md'
            onClick={onClose}
            sx={{
              color: Colors.darkGold,
              borderColor: Colors.darkGold,
              '&:hover': {
                backgroundColor: Colors.lightGold,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            size='md'
            sx={{
              backgroundColor: Colors.darkGold,
              '&:hover': { backgroundColor: Colors.darkerGold },
            }}
            onClick={handleSend}
            disabled={loading || !department}
          >
            Send
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default SendNotificationModal;
