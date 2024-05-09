import WarningIcon from '@mui/icons-material/Warning';
import { Alert, Modal, Sheet, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';

const OfflineModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOpen(true);
    const handleOnline = () => setIsOpen(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    if (!navigator.onLine) {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      disableEscapeKeyDown={true}
    >
      <Sheet
        sx={{
          width: 'auto',
          borderRadius: 'md',
          p: 4,
          boxShadow: 'lg',
          bgcolor: 'background.paper',
          maxWidth: '400px',
        }}
      >
        <Typography component='h2' level='h3' sx={{ mb: 1, fontWeight: 'bold' }}>
          No Internet Connection
        </Typography>
        <Typography sx={{ mb: 2 }}>
          You are not connected to the internet. Please check your connection and try again.
        </Typography>
        <Alert
          startDecorator={<WarningIcon />}
          variant='soft'
          color='warning'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Check your network settings.
        </Alert>
      </Sheet>
    </Modal>
  );
};

export default OfflineModal;
