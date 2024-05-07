import { useContext, useEffect } from 'react';
import { SnackbarContext } from '../../hooks/snackbarContext';

import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import colors from '../../colors';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { APIPath, RequestMethods } from '../../utils/constants';

type ModalEditProps = {
  setProjectIsArchived: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  title: string;
  description: string;
  open: boolean;
  projectIsArchived: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEditConfirmation = ({
  projectIsArchived,
  setProjectIsArchived,
  projectId,
  title,
  description,
  open,
  setOpen,
}: ModalEditProps) => {
  const { setState } = useContext(SnackbarContext);

  const { data, loading, sendRequest, error } = useHttp<ProjectEntity>(
    `${APIPath.PROJECT_DETAILS}/${projectId}`,
    RequestMethods.PUT
  );

  useEffect(() => {
    if (error) {
      setState({ open: true, message: error.message });
    }
    if (data) {
      setState({ open: true, message: 'Project updated successfully.', type: 'success' });
      if (open) {
        setOpen(false);
        // setRefetch(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleUpdate = async () => {
    const updatedProjectData = {
      id: data?.id,
    };
    await sendRequest({}, updatedProjectData);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        <ModalClose variant='plain' sx={{ m: 1 }} />
        <Typography
          component='h2'
          id='modal-title'
          level='h3'
          textColor='inherit'
          fontWeight='lg'
          mb={1}
        >
          {title}
        </Typography>
        <Typography id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
          {description}
        </Typography>
        <Box
          mt={3}
          display='flex'
          alignItems='center'
          justifyContent='end'
          gap={2}
          onSubmit={handleUpdate}
        >
          <Button
            onClick={() => setOpen(false)}
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
            onClick={() => {
              handleUpdate();
              setProjectIsArchived(!projectIsArchived);
            }}
          >
            Archive
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalEditConfirmation;
