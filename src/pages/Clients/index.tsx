import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import DeleteModal from '../../components/common/DeleteModal';

const Clients = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <main className='p-10 py-4 flex gap-4'>
      <h1>Clients Page</h1>
      <p>Welcome to the Clients page!</p>
      <Delete onClick={openModal} />
      <DeleteModal
        open={open}
        title='Delete Client'
        description='Are you sure to delete this client?'
        setOpen={setOpen}
      />
    </main>
  );
};

export default Clients;
