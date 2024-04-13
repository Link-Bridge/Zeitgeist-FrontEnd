import { Delete } from '@mui/icons-material';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import * as React from 'react';

export default function DeleteModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <Delete />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
