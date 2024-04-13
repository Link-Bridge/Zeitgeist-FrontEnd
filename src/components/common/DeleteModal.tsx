import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
// import * as React from 'react';

export default function DeleteModal() {
  // const [open, setOpen] = React.useState<boolean>(false);
  return (
    <IconButton>
      <Delete />
    </IconButton>
  );
}
