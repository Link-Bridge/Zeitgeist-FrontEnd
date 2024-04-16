import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
import Table from '@mui/joy/Table';
import { useState } from 'react';
import DeleteModal from '../../common/DeleteModal';

type Employee = {
  fullName: string;
  email: string;
  role: string;
};

export default function EmployeeTable({ fullName, email, role }: Employee) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  return (
    <Table variant={'outlined'}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th style={{ width: '10%' }}></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{fullName}</td>
          <td>{role}</td>
          <td>{email}</td>
          <td>
            <IconButton>
              <Delete onClick={openModal} />
              
            </IconButton>
          </td>
        </tr>
      </tbody>
      <DeleteModal
        open={open}
        title='Delete Employee'
        description='Are you sure you want to delete this employee?'
        setOpen={setOpen}
      />
    </Table>
  );
}
