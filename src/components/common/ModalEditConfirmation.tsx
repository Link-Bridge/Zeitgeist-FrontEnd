import { useContext, useEffect, useState } from 'react';

import colors from '../../colors';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';

import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import { ProjectEntity } from '../../types/project';
import { RequestMethods } from '../../utils/constants';

type ModalEditProps = {
  project: ProjectEntity;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

/**
 * Modal component for confirming modiyfing archived property of a project
 *
 * @param project: ProjectEntity - desired project object with data
 * @param open: boolean - state of the modal
 * @param setOpen: (open: boolean) => void -
 *                         Function to update the state of the modal
 * @param refetch: void - Function to refetch company info after updated isArchived property
 * @returns JSX.Element - React component
 */

const ModalEditConfirmation = ({ project, open, setOpen, refetch }: ModalEditProps) => {
  const { setState } = useContext(SnackbarContext);
  const [isArchived, setIsArchived] = useState(project.isArchived);

  const { data, sendRequest, error } = useHttp<ProjectEntity>(
    `/project/edit/${project.id}`,
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
        refetch();
      }
    }
  }, [data, error]);

  const handleArchive = async () => {
    setIsArchived(!isArchived);

    const updatedProjectData = {
      ...project,
      isArchived: !isArchived,
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
          {project?.isArchived ? 'Unarchive Project' : 'Archive Project'}
        </Typography>
        <Typography id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
          {project?.isArchived
            ? 'Are sure you want to unarchive this project?'
            : 'Are sure you want to archive this project?'}
        </Typography>
        <Box
          mt={3}
          display='flex'
          alignItems='center'
          justifyContent='end'
          gap={2}
          onSubmit={handleArchive}
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
              handleArchive();
            }}
          >
            {project.isArchived ? 'Unarchive' : 'Archive'}
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalEditConfirmation;
